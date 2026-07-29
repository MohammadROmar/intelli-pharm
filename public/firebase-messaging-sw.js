'use strict';

importScripts(
  'https://www.gstatic.com/firebasejs/12.13.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/12.13.0/firebase-messaging-compat.js',
);

const DEFAULT_NOTIFICATION_PATH = '/dashboard/notifications';
const ALLOWED_PATH_PREFIX = '/dashboard';
const CLIENT_MESSAGE_TYPE = 'intelli-pharm:fcm-background-message';
const LEGACY_AUTH_DATABASE_NAME = 'intelli-pharm-sw';
const params = new URLSearchParams(self.location.search);
const REQUIRED_CONFIG_KEYS = [
  'apiKey',
  'projectId',
  'messagingSenderId',
  'appId',
];

const firebaseConfig = {
  apiKey: params.get('apiKey'),
  authDomain: params.get('authDomain'),
  projectId: params.get('projectId'),
  storageBucket: params.get('storageBucket'),
  messagingSenderId: params.get('messagingSenderId'),
  appId: params.get('appId'),
};

const missingConfigKeys = REQUIRED_CONFIG_KEYS.filter((key) => {
  const value = firebaseConfig[key];
  return typeof value !== 'string' || value.length === 0;
});

if (missingConfigKeys.length > 0) {
  throw new Error(
    `[firebase-messaging-sw] Missing config: ${missingConfigKeys.join(', ')}`,
  );
}

firebase.initializeApp(firebaseConfig);

self.addEventListener('install', () => {
  self.skipWaiting();
});

function deleteLegacyAuthDatabase() {
  if (!('indexedDB' in self)) return Promise.resolve();

  return new Promise((resolve) => {
    try {
      const request = self.indexedDB.deleteDatabase(LEGACY_AUTH_DATABASE_NAME);

      request.addEventListener('success', () => resolve(), { once: true });
      request.addEventListener('error', () => resolve(), { once: true });
      request.addEventListener('blocked', () => resolve(), { once: true });
    } catch {
      resolve();
    }
  });
}

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([self.clients.claim(), deleteLegacyAuthDatabase()]),
  );
});

function readData(payload) {
  return payload?.data && typeof payload.data === 'object' ? payload.data : {};
}

function readString(value) {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function getSafeNotificationPath(link) {
  try {
    const url = new URL(
      readString(link) ?? DEFAULT_NOTIFICATION_PATH,
      self.location.origin,
    );

    if (
      url.origin !== self.location.origin ||
      (url.pathname !== ALLOWED_PATH_PREFIX &&
        !url.pathname.startsWith(`${ALLOWED_PATH_PREFIX}/`))
    ) {
      return DEFAULT_NOTIFICATION_PATH;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return DEFAULT_NOTIFICATION_PATH;
  }
}

async function notifyOpenClients(payload, data) {
  const windowClients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  const message = {
    type: CLIENT_MESSAGE_TYPE,
    payload: {
      messageId:
        readString(payload?.messageId) ??
        readString(payload?.fcmMessageId) ??
        readString(data.id),
      data,
      fallbackTitle: readString(payload?.notification?.title),
      fallbackBody: readString(payload?.notification?.body),
    },
  };

  windowClients.forEach((client) => client.postMessage(message));
}

function readPushPayload(event) {
  if (!event.data) return null;

  try {
    const payload = event.data.json();
    return payload && typeof payload === 'object' ? payload : null;
  } catch {
    return null;
  }
}

self.addEventListener('push', (event) => {
  const payload = readPushPayload(event);
  if (!payload) return;

  event.waitUntil(notifyOpenClients(payload, readData(payload)));
});

const messaging = firebase.messaging();

async function showDataNotification(payload, data) {
  const messageId = readString(payload?.messageId);
  const notificationId = readString(data.id);
  const tag =
    notificationId ??
    messageId ??
    `${readString(data.type) ?? 'notification'}-${Date.now()}`;
  const link = getSafeNotificationPath(data.link);

  await self.registration.showNotification(
    readString(data.title) ?? 'New Notification',
    {
      body: readString(data.body) ?? '',
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      tag,
      renotify: true,
      data: {
        ...data,
        link,
        messageId,
      },
    },
  );
}

messaging.onBackgroundMessage(async (payload) => {
  const data = readData(payload);

  if (payload?.notification) return;

  try {
    await showDataNotification(payload, data);
  } catch (error) {
    console.error(
      '[firebase-messaging-sw] Could not display background notification',
      error,
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetPath = getSafeNotificationPath(event.notification.data?.link);
  const targetUrl = new URL(targetPath, self.location.origin).href;

  event.waitUntil(
    (async () => {
      const windowClients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      const exactClient = windowClients.find(
        (client) => client.url === targetUrl,
      );

      if (exactClient && 'focus' in exactClient) {
        return exactClient.focus();
      }

      const existingClient = windowClients.find(
        (client) =>
          client.url.startsWith(self.location.origin) && 'focus' in client,
      );

      if (existingClient) {
        await existingClient.focus();

        if ('navigate' in existingClient) {
          try {
            return await existingClient.navigate(targetUrl);
          } catch (error) {
            console.warn(
              '[firebase-messaging-sw] Client navigation failed',
              error,
            );
          }
        }
      }

      return self.clients.openWindow(targetUrl);
    })(),
  );
});
