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

const NOTIFICATIONS_PATH = '/dashboard/notifications';

messaging.onBackgroundMessage((payload) => {
  const { data, notification } = payload;

  const title = notification?.title ?? data?.title ?? 'New Notification';
  const body = notification?.body ?? data?.body ?? '';

  const channel = new BroadcastChannel('fcm-notifications');
  channel.postMessage({ data });
  channel.close();

  return self.registration.showNotification(title, {
    body,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-72.png',
    tag: data?.type ?? 'default',
    renotify: false,
    data,
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(self.location.origin + NOTIFICATIONS_PATH),
  );
});
