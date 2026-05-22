importScripts(
  'https://www.gstatic.com/firebasejs/12.13.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/12.13.0/firebase-messaging-compat.js',
);

firebase.initializeApp({
  apiKey: 'AIzaSyCdHJe0cVdkoQB9zFA4Gm1HUU1zyJU9Pco',
  authDomain: 'gradproj2026-14176.firebaseapp.com',
  projectId: 'gradproj2026-14176',
  storageBucket: 'gradproj2026-14176.firebasestorage.app',
  messagingSenderId: '961183523349',
  appId: '1:961183523349:web:8e44a3032c8c9052fc241c',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { data, notification } = payload;

  const title = notification?.title ?? data?.title ?? 'New Notification';
  const body = notification?.body ?? data?.body ?? '';

  self.registration.showNotification(title, {
    body,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-72.png',
    tag: data?.type ?? 'default',
    renotify: false,
    data: data,
  });

  const channel = new BroadcastChannel('fcm-notifications');
  channel.postMessage({ data });
  channel.close();
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const notifData = event.notification.data ?? {};

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (
            client.url.startsWith(self.location.origin) &&
            'focus' in client
          ) {
            client.postMessage({ type: 'NOTIFICATION_CLICK', data: notifData });
            return client.focus();
          }
        }
        return clients.openWindow(targetUrl);
      }),
  );
});
