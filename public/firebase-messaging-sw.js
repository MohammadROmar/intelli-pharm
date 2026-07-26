importScripts(
  'https://www.gstatic.com/firebasejs/12.13.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/12.13.0/firebase-messaging-compat.js',
);

const params = new URLSearchParams(self.location.search);

firebase.initializeApp({
  apiKey: params.get('apiKey'),
  authDomain: params.get('authDomain'),
  projectId: params.get('projectId'),
  storageBucket: params.get('storageBucket'),
  messagingSenderId: params.get('messagingSenderId'),
  appId: params.get('appId'),
});

const messaging = firebase.messaging();
const DEFAULT_NOTIFICATION_PATH = '/dashboard/notifications';

function getTokenOptions() {
  return { vapidKey: VAPID_KEY, serviceWorkerRegistration: self.registration };
}

const VAPID_KEY = params.get('vapidKey');
const API_BASE_URL = params.get('apiBaseUrl');
const DEVICE_TOKEN_ENDPOINT = '/auth/v1/notifications/device-token';
const REFRESH_ENDPOINT = '/auth/v2/refresh';
const BACKGROUND_SYNC_TAG = 'fcm-token-resync';
const DEVICE_TOKEN_MAX_ATTEMPTS = 3;
const DEVICE_TOKEN_RETRY_BASE_DELAY_MS = 1000;
const ACCESS_TOKEN_SAFETY_MARGIN_MS = 60_000;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

const AUTH_BROADCAST_CHANNEL = 'auth-sync';
const SW_DB_NAME = 'intelli-pharm-sw';
const SW_KV_STORE = 'kv';
const ACCESS_TOKEN_KEY = 'cachedAccessToken';

function openSwStore() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(SW_DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(SW_KV_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idbGet(key) {
  const db = await openSwStore();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SW_KV_STORE, 'readonly');
    const req = tx.objectStore(SW_KV_STORE).get(key);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet(key, value) {
  const db = await openSwStore();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SW_KV_STORE, 'readwrite');
    tx.objectStore(SW_KV_STORE).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function cacheAccessToken(loginResponse) {
  if (!loginResponse?.access_token || !loginResponse?.expires_in) return;
  await idbSet(ACCESS_TOKEN_KEY, {
    accessToken: loginResponse.access_token,
    expiresAt: Date.now() + loginResponse.expires_in * 1000,
  }).catch((error) => {
    console.warn('[firebase-messaging-sw] caching access token failed:', error);
  });
}

async function clearCachedAccessToken() {
  await idbSet(ACCESS_TOKEN_KEY, null).catch(() => {});
}

async function getCachedAccessToken() {
  const cached = await idbGet(ACCESS_TOKEN_KEY).catch(() => null);
  if (!cached?.accessToken || !cached?.expiresAt) return null;
  if (Date.now() > cached.expiresAt - ACCESS_TOKEN_SAFETY_MARGIN_MS) {
    return null;
  }
  return cached.accessToken;
}

const authSyncChannel =
  typeof BroadcastChannel !== 'undefined'
    ? new BroadcastChannel(AUTH_BROADCAST_CHANNEL)
    : null;

authSyncChannel?.addEventListener('message', (event) => {
  const message = event.data;

  if (message?.type === 'refreshed' && message.data?.access_token) {
    cacheAccessToken(message.data);
  } else if (message?.type === 'logout') {
    clearCachedAccessToken();
  }
});

async function refreshAccessTokenOnce() {
  try {
    const response = await fetch(`${API_BASE_URL}${REFRESH_ENDPOINT}`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      console.warn(
        '[firebase-messaging-sw] token refresh rejected:',
        response.status,
      );
      return null;
    }

    const data = await response.json();
    if (!data?.access_token) return null;

    console.info('[firebase-messaging-sw] token refresh succeeded');
    await cacheAccessToken(data);
    return data.access_token;
  } catch (error) {
    console.warn(
      '[firebase-messaging-sw] token refresh request failed:',
      error,
    );
    return null;
  }
}

async function getAccessToken() {
  const cached = await getCachedAccessToken();
  if (cached) return cached;
  return refreshAccessTokenOnce();
}

self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(resyncTokenWithBackend());
});

self.addEventListener('sync', (event) => {
  if (event.tag === BACKGROUND_SYNC_TAG) {
    event.waitUntil(resyncTokenWithBackend());
  }
});

let resyncInFlight = null;

async function resyncTokenWithBackend() {
  if (!API_BASE_URL || !VAPID_KEY) return;

  if (!resyncInFlight) {
    resyncInFlight = (async () => {
      const token = await pollForRotatedToken();
      if (token) await reportTokenToBackend(token);
    })().finally(() => {
      resyncInFlight = null;
    });
  }

  return resyncInFlight;
}

async function pollForRotatedToken(attempts = 4, baseDelayMs = 700) {
  let latest = null;

  for (let attempt = 0; attempt < attempts; attempt++) {
    await sleep(baseDelayMs * 2 ** attempt);

    try {
      latest = await messaging.getToken(getTokenOptions());
    } catch (error) {
      console.warn('[firebase-messaging-sw] getToken() poll failed:', error);
    }
  }

  return latest;
}

async function reportTokenToBackend(token) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    console.warn(
      '[firebase-messaging-sw] no access token available — skipping device-token report',
    );
    return;
  }

  for (let attempt = 1; attempt <= DEVICE_TOKEN_MAX_ATTEMPTS; attempt++) {
    const outcome = await attemptRegisterDeviceToken(token, accessToken);
    if (outcome !== 'retryable') return;

    const isLastAttempt = attempt === DEVICE_TOKEN_MAX_ATTEMPTS;
    if (isLastAttempt) {
      await scheduleRetryOnReconnect();
      return;
    }

    await sleep(DEVICE_TOKEN_RETRY_BASE_DELAY_MS * 2 ** (attempt - 1));
  }
}

/** @returns {Promise<'success' | 'retryable' | 'non-retryable'>} */
async function attemptRegisterDeviceToken(token, accessToken) {
  try {
    const response = await fetch(`${API_BASE_URL}${DEVICE_TOKEN_ENDPOINT}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ fcm_token: token }),
    });

    if (response.ok) {
      console.info('[firebase-messaging-sw] device-token register succeeded');
      return 'success';
    }

    if (response.status === 401) {
      console.warn(
        '[firebase-messaging-sw] device-token register rejected (401)',
      );
      await clearCachedAccessToken();
      return 'non-retryable';
    }

    if (response.status >= 400 && response.status < 500) {
      console.warn(
        '[firebase-messaging-sw] device-token register rejected:',
        response.status,
      );
      return 'non-retryable';
    }

    console.warn(
      '[firebase-messaging-sw] device-token register failed (server):',
      response.status,
    );
    return 'retryable';
  } catch (error) {
    console.warn(
      '[firebase-messaging-sw] device-token register fetch failed:',
      error,
    );
    return 'retryable';
  }
}

async function scheduleRetryOnReconnect() {
  if (!self.registration.sync) return;
  try {
    await self.registration.sync.register(BACKGROUND_SYNC_TAG);
  } catch (error) {
    console.warn(
      '[firebase-messaging-sw] Background Sync registration failed:',
      error,
    );
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

messaging.onBackgroundMessage((payload) => {
  try {
    const { data } = payload;

    const title = data?.title ?? 'New Notification';
    const body = data?.body ?? '';
    const tag = data?.id ?? `${data?.type ?? 'default'}-${Date.now()}`;
    const link = data?.link ?? DEFAULT_NOTIFICATION_PATH;

    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('fcm-notifications');
        channel.postMessage({ data });
        channel.close();
      }
    } catch (channelError) {
      console.error(
        '[firebase-messaging-sw] BroadcastChannel failed:',
        channelError,
      );
    }

    return self.registration.showNotification(title, {
      body,
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      tag,
      renotify: true,
      data: { ...data, link },
    });
  } catch (error) {
    console.error(
      '[firebase-messaging-sw] Failed to handle background message:',
      error,
    );
    return self.registration.showNotification('New Notification', {
      body: 'You have a new update.',
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      data: { link: DEFAULT_NOTIFICATION_PATH },
    });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetPath = event.notification.data?.link ?? DEFAULT_NOTIFICATION_PATH;
  const targetUrl = self.location.origin + targetPath;

  event.waitUntil(
    (async () => {
      const windowClients = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      for (const client of windowClients) {
        if (client.url.startsWith(self.location.origin) && 'focus' in client) {
          await client.focus();
          if ('navigate' in client) {
            return client.navigate(targetUrl);
          }
          return;
        }
      }

      return clients.openWindow(targetUrl);
    })(),
  );
});
