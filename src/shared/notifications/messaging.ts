import type { Messaging, MessagePayload } from 'firebase/messaging';
import { getFirebaseApp } from './config';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;
export const FCM_TOKEN_STORAGE_KEY = 'fcm_token';
export const FCM_BROADCAST_CHANNEL = 'fcm-notifications';

let messagingInstance: Messaging | null = null;
let swRegistrationInstance: ServiceWorkerRegistration | null = null;

export async function getMessagingInstance() {
  if (messagingInstance) return messagingInstance;
  const { getMessaging } = await import('firebase/messaging');
  const app = await getFirebaseApp();
  messagingInstance = getMessaging(app);
  return messagingInstance;
}

export async function getSWRegistration() {
  if (swRegistrationInstance) return swRegistrationInstance;
  swRegistrationInstance = await navigator.serviceWorker.register(
    '/firebase-messaging-sw.js',
    { scope: '/' },
  );
  return swRegistrationInstance;
}

function readToken() {
  try {
    return localStorage.getItem(FCM_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

const writeToken = (token: string): void => {
  try {
    localStorage.setItem(FCM_TOKEN_STORAGE_KEY, token);
  } catch {
    // Silently ignore — token rotation will still work on next session
  }
};

async function fetchToken() {
  const [messaging, swRegistration] = await Promise.all([
    getMessagingInstance(),
    getSWRegistration(),
  ]);

  const { getToken } = await import('firebase/messaging');

  if (!VAPID_KEY) {
    console.error('[FCM] Missing VITE_FIREBASE_VAPID_KEY');
    return null;
  }

  const token = await getToken(messaging, {
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration: swRegistration,
  });

  return token ?? null;
}

export async function requestPermissionAndGetToken() {
  if (!('Notification' in window) || !('serviceWorker' in navigator))
    return null;

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return null;

  try {
    const token = await fetchToken();
    if (token) writeToken(token);
    return token;
  } catch (err) {
    console.error('[FCM] getToken failed:', err);
    return null;
  }
}

export async function getFreshTokenSilently() {
  if (Notification.permission !== 'granted') return null;
  try {
    return await fetchToken();
  } catch {
    return null;
  }
}

export async function onForegroundMessage(
  callback: (payload: MessagePayload) => void,
) {
  const { onMessage } = await import('firebase/messaging');
  const messaging = await getMessagingInstance();
  return onMessage(messaging, callback);
}

export { readToken, writeToken };
