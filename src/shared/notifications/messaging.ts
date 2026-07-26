import type { Messaging, MessagePayload } from 'firebase/messaging';
import {
  getFirebaseApp,
  firebaseConfig,
  isFirebaseConfigValid,
} from './config';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;
export const FCM_TOKEN_STORAGE_KEY = 'fcm_token';
export const FCM_BROADCAST_CHANNEL = 'fcm-notifications';

const API_BASE_URL = import.meta.env.VITE_API_URL;

let messagingPromise: Promise<Messaging> | null = null;

async function initMessaging(): Promise<Messaging> {
  const { getMessaging } = await import('firebase/messaging');
  const app = await getFirebaseApp();
  return getMessaging(app);
}

export function getMessagingInstance(): Promise<Messaging> {
  if (!messagingPromise) {
    messagingPromise = initMessaging().catch((error) => {
      messagingPromise = null;
      throw error;
    });
  }
  return messagingPromise;
}

let swRegistrationPromise: Promise<ServiceWorkerRegistration> | null = null;

async function registerServiceWorker(): Promise<ServiceWorkerRegistration> {
  const params = new URLSearchParams({
    ...firebaseConfig,
    vapidKey: VAPID_KEY ?? '',
    apiBaseUrl: API_BASE_URL ?? '',
  } as Record<string, string>);

  const registration = await navigator.serviceWorker.register(
    `/firebase-messaging-sw.js?${params.toString()}`,
    { scope: '/', updateViaCache: 'none' },
  );

  await waitForActivation(registration);
  return registration;
}

export function getSWRegistration(): Promise<ServiceWorkerRegistration> {
  if (!swRegistrationPromise) {
    swRegistrationPromise = registerServiceWorker().catch((error) => {
      swRegistrationPromise = null;
      throw error;
    });
  }
  return swRegistrationPromise;
}

function waitForActivation(
  registration: ServiceWorkerRegistration,
  timeoutMs = 15_000,
): Promise<void> {
  if (registration.active) return Promise.resolve();

  const worker = registration.installing ?? registration.waiting;
  if (!worker) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error('[FCM] Service worker activation timed out'));
    }, timeoutMs);

    function handleStateChange() {
      if (worker!.state === 'activated') {
        cleanup();
        resolve();
      } else if (worker!.state === 'redundant') {
        cleanup();
        reject(
          new Error('[FCM] Service worker was discarded before activating'),
        );
      }
    }

    function cleanup() {
      clearTimeout(timeoutId);
      worker!.removeEventListener('statechange', handleStateChange);
    }

    worker.addEventListener('statechange', handleStateChange);
  });
}

const FCM_TOKEN_LOCK_NAME = 'intelli-pharm:fcm-token';

export const hasWebLocks =
  typeof navigator !== 'undefined' && !!navigator.locks;

export function withTokenLock<T>(task: () => Promise<T>): Promise<T> {
  if (!hasWebLocks) return task();
  return navigator.locks.request(FCM_TOKEN_LOCK_NAME, task) as Promise<T>;
}

function readToken() {
  try {
    return localStorage.getItem(FCM_TOKEN_STORAGE_KEY);
  } catch (e) {
    console.warn('[FCM] COULD NOT READ TOKEN', e);
    return null;
  }
}

const writeToken = (token: string): void => {
  try {
    localStorage.setItem(FCM_TOKEN_STORAGE_KEY, token);
  } catch (e) {
    console.warn('[FCM] COULD NOT WRITE TOKEN', e);
    // Silently ignore — token rotation will still work on next session
  }
};

const clearStoredToken = (): void => {
  try {
    localStorage.removeItem(FCM_TOKEN_STORAGE_KEY);
  } catch (e) {
    console.warn('[FCM] COULD NOT CLEAR TOKEN', e);
  }
};

let inFlightTokenFetch: Promise<string | null> | null = null;

async function fetchToken(): Promise<string | null> {
  if (inFlightTokenFetch) return inFlightTokenFetch;

  inFlightTokenFetch = (async () => {
    if (!isFirebaseConfigValid) {
      console.error('[FCM] Firebase config is invalid — skipping token fetch');
      return null;
    }
    if (!VAPID_KEY) {
      console.error('[FCM] Missing VITE_FIREBASE_VAPID_KEY');
      return null;
    }

    const [messaging, swRegistration] = await Promise.all([
      getMessagingInstance(),
      getSWRegistration(),
    ]);

    const { getToken } = await import('firebase/messaging');

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    });

    return token ?? null;
  })();

  try {
    return await inFlightTokenFetch;
  } finally {
    inFlightTokenFetch = null;
  }
}

export async function requestPermissionAndGetToken() {
  if (!('Notification' in window) || !('serviceWorker' in navigator))
    return null;

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return null;

  return withTokenLock(async () => {
    try {
      const token = await fetchToken();
      if (token) writeToken(token);
      return token;
    } catch (err) {
      console.error('[FCM] getToken failed:', err);
      clearStoredToken();
      return null;
    }
  });
}

export async function getFreshTokenSilently() {
  if (Notification.permission !== 'granted') {
    clearStoredToken();
    return null;
  }
  return withTokenLock(async () => {
    try {
      return await fetchToken();
    } catch (err) {
      console.error('[FCM] getFreshTokenSilently failed:', err);
      clearStoredToken();
      return null;
    }
  });
}

export async function forceRefreshToken(): Promise<string | null> {
  if (
    typeof Notification === 'undefined' ||
    Notification.permission !== 'granted'
  ) {
    clearStoredToken();
    return null;
  }

  return withTokenLock(async () => {
    try {
      const { deleteToken } = await import('firebase/messaging');
      const messaging = await getMessagingInstance();
      await deleteToken(messaging);
    } catch (err) {
      console.warn(
        '[FCM] deleteToken before forced refresh failed (continuing):',
        err,
      );
    }

    try {
      return await fetchToken();
    } catch (err) {
      console.error('[FCM] forceRefreshToken failed:', err);
      return null;
    }
  });
}

export async function unregisterToken(): Promise<void> {
  const token = readToken();
  if (!token) return;

  await withTokenLock(async () => {
    try {
      const { deleteToken } = await import('firebase/messaging');
      const messaging = await getMessagingInstance();
      await deleteToken(messaging);
    } catch (err) {
      console.warn('[FCM] deleteToken failed (continuing local cleanup):', err);
    } finally {
      clearStoredToken();
    }
  });
}

export async function onForegroundMessage(
  callback: (payload: MessagePayload) => void,
) {
  const { onMessage } = await import('firebase/messaging');
  const messaging = await getMessagingInstance();
  return onMessage(messaging, callback);
}

export { readToken, writeToken };
