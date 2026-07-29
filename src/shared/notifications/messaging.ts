import type { MessagePayload, Messaging } from 'firebase/messaging';

import {
  firebaseConfig,
  getFirebaseApp,
  isFirebaseConfigValid,
} from './config';
import { requestNotificationPermission } from './permission';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;
const SERVICE_WORKER_PATH = '/firebase-messaging-sw.js';
const SERVICE_WORKER_SCOPE = '/';
const FCM_TOKEN_LOCK_NAME = 'intelli-pharm:fcm-token';
const FCM_REGISTRATION_LOCK_NAME = 'intelli-pharm:fcm-registration';
const TOKEN_UNSUBSCRIBE_FAILED_CODE = 'messaging/token-unsubscribe-failed';

export const FCM_TOKEN_STORAGE_KEY = 'fcm_token';
export const FCM_SERVICE_WORKER_MESSAGE_TYPE =
  'intelli-pharm:fcm-background-message';

let messagingPromise: Promise<Messaging> | null = null;
let supportPromise: Promise<boolean> | null = null;
let swRegistrationPromise: Promise<ServiceWorkerRegistration> | null = null;
let inFlightTokenFetch: Promise<string | null> | null = null;

type ForegroundMessageCallback = (payload: MessagePayload) => void;

type ForegroundMessageHub = {
  callbacks: Set<ForegroundMessageCallback>;
  firebaseUnsubscribe: (() => void) | null;
  generation: number;
  setupPromise: Promise<void> | null;
};

type MessagingGlobalScope = typeof globalThis & {
  __intelliPharmFcmForegroundHub__?: ForegroundMessageHub;
};

const messagingGlobalScope = globalThis as MessagingGlobalScope;
const foregroundMessageHub: ForegroundMessageHub =
  messagingGlobalScope.__intelliPharmFcmForegroundHub__ ?? {
    callbacks: new Set(),
    firebaseUnsubscribe: null,
    generation: 0,
    setupPromise: null,
  };

messagingGlobalScope.__intelliPharmFcmForegroundHub__ = foregroundMessageHub;

export class MessagingUnsupportedError extends Error {
  constructor() {
    super('[FCM] Messaging is unsupported or misconfigured');
    this.name = 'MessagingUnsupportedError';
  }
}

export function isMessagingUnsupportedError(
  error: unknown,
): error is MessagingUnsupportedError {
  return (
    error instanceof MessagingUnsupportedError ||
    (error instanceof Error && error.name === 'MessagingUnsupportedError')
  );
}

function hasMessagingErrorCode(error: unknown, code: string): boolean {
  return (
    error instanceof Error &&
    'code' in error &&
    (error as Error & { code?: unknown }).code === code
  );
}

function hasRequiredBrowserApis(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.isSecureContext &&
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'indexedDB' in window
  );
}

export function isMessagingSupported(): Promise<boolean> {
  if (
    !hasRequiredBrowserApis() ||
    !isFirebaseConfigValid ||
    typeof VAPID_KEY !== 'string' ||
    VAPID_KEY.length === 0
  ) {
    return Promise.resolve(false);
  }

  if (!supportPromise) {
    supportPromise = import('firebase/messaging')
      .then(({ isSupported }) => isSupported())
      .catch((error) => {
        supportPromise = null;
        throw error;
      });
  }

  return supportPromise;
}

async function initializeMessaging(): Promise<Messaging> {
  if (!(await isMessagingSupported())) {
    throw new MessagingUnsupportedError();
  }

  const [{ getMessaging }, app] = await Promise.all([
    import('firebase/messaging'),
    getFirebaseApp(),
  ]);

  return getMessaging(app);
}

export function getMessagingInstance(): Promise<Messaging> {
  if (!messagingPromise) {
    messagingPromise = initializeMessaging().catch((error) => {
      messagingPromise = null;
      throw error;
    });
  }

  return messagingPromise;
}

function isExpectedMessagingWorker(
  registration: ServiceWorkerRegistration,
): boolean {
  const scriptUrl =
    registration.active?.scriptURL ??
    registration.waiting?.scriptURL ??
    registration.installing?.scriptURL;

  if (!scriptUrl) return false;

  try {
    return new URL(scriptUrl).pathname === SERVICE_WORKER_PATH;
  } catch {
    return false;
  }
}

async function registerServiceWorker(): Promise<ServiceWorkerRegistration> {
  const existingRegistration =
    await navigator.serviceWorker.getRegistration(SERVICE_WORKER_SCOPE);

  if (
    existingRegistration &&
    !isExpectedMessagingWorker(existingRegistration)
  ) {
    throw new Error(
      '[FCM] Another service worker owns the root scope. Merge the Firebase messaging handler into that worker instead of replacing it.',
    );
  }

  const params = new URLSearchParams();
  Object.entries(firebaseConfig).forEach(([key, value]) => {
    if (typeof value === 'string') params.set(key, value);
  });

  const registration = await navigator.serviceWorker.register(
    `${SERVICE_WORKER_PATH}?${params.toString()}`,
    {
      scope: SERVICE_WORKER_SCOPE,
      updateViaCache: 'none',
    },
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
  if (!worker) {
    return Promise.reject(
      new Error('[FCM] Service worker has no installable worker'),
    );
  }

  const activatingWorker: ServiceWorker = worker;

  if (activatingWorker.state === 'activated') return Promise.resolve();

  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error('[FCM] Service worker activation timed out'));
    }, timeoutMs);

    function handleStateChange(): void {
      if (activatingWorker.state === 'activated') {
        cleanup();
        resolve();
      } else if (activatingWorker.state === 'redundant') {
        cleanup();
        reject(
          new Error('[FCM] Service worker was discarded before activation'),
        );
      }
    }

    function cleanup(): void {
      window.clearTimeout(timeoutId);
      activatingWorker.removeEventListener('statechange', handleStateChange);
    }

    activatingWorker.addEventListener('statechange', handleStateChange);
  });
}

async function withNamedLock<T>(
  name: string,
  task: () => Promise<T>,
): Promise<T> {
  const lockManager =
    typeof navigator !== 'undefined' ? navigator.locks : undefined;

  if (!lockManager) return task();

  return await lockManager.request(name, async () => {
    return await task();
  });
}

export function withTokenLock<T>(task: () => Promise<T>): Promise<T> {
  return withNamedLock(FCM_TOKEN_LOCK_NAME, task);
}

export function withRegistrationLock<T>(task: () => Promise<T>): Promise<T> {
  return withNamedLock(FCM_REGISTRATION_LOCK_NAME, task);
}

export function readToken(): string | null {
  try {
    return localStorage.getItem(FCM_TOKEN_STORAGE_KEY);
  } catch (error) {
    console.warn('[FCM] Could not read the synced token', error);
    return null;
  }
}

export function writeToken(token: string): void {
  try {
    localStorage.setItem(FCM_TOKEN_STORAGE_KEY, token);
  } catch (error) {
    console.warn('[FCM] Could not persist the synced token', error);
  }
}

export function clearStoredToken(): void {
  try {
    localStorage.removeItem(FCM_TOKEN_STORAGE_KEY);
  } catch (error) {
    console.warn('[FCM] Could not clear the synced token', error);
  }
}

async function fetchToken(): Promise<string | null> {
  if (inFlightTokenFetch) return inFlightTokenFetch;

  inFlightTokenFetch = (async () => {
    if (!(await isMessagingSupported())) {
      throw new MessagingUnsupportedError();
    }

    const [{ getToken }, messaging, swRegistration] = await Promise.all([
      import('firebase/messaging'),
      getMessagingInstance(),
      getSWRegistration(),
    ]);

    const tokenOptions = {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    };
    let token: string;

    try {
      token = await getToken(messaging, tokenOptions);
    } catch (error) {
      if (!hasMessagingErrorCode(error, TOKEN_UNSUBSCRIBE_FAILED_CODE)) {
        throw error;
      }

      const staleSubscription =
        await swRegistration.pushManager.getSubscription();
      const wasUnsubscribed =
        !staleSubscription || (await staleSubscription.unsubscribe());

      if (!wasUnsubscribed) throw error;

      clearStoredToken();
      token = await getToken(messaging, tokenOptions);
    }

    return token || null;
  })();

  try {
    return await inFlightTokenFetch;
  } finally {
    inFlightTokenFetch = null;
  }
}

export async function requestPermissionAndGetToken(): Promise<string | null> {
  if (!hasRequiredBrowserApis()) return null;

  const permission = await requestNotificationPermission();
  if (permission !== 'granted') return null;

  return getFreshTokenSilently();
}

export async function getFreshTokenSilently(): Promise<string | null> {
  if (
    typeof Notification === 'undefined' ||
    Notification.permission !== 'granted'
  ) {
    return null;
  }

  return withTokenLock(fetchToken);
}

export async function unregisterToken(): Promise<void> {
  try {
    if (
      typeof Notification === 'undefined' ||
      Notification.permission !== 'granted' ||
      !(await isMessagingSupported())
    ) {
      return;
    }

    await withTokenLock(async () => {
      const [{ deleteToken, getToken }, messaging, swRegistration] =
        await Promise.all([
          import('firebase/messaging'),
          getMessagingInstance(),
          getSWRegistration(),
        ]);

      await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: swRegistration,
      });
      await deleteToken(messaging);
    });
  } catch (error) {
    console.warn('[FCM] Browser token removal failed', error);
  } finally {
    resetForegroundMessageHub();
    clearStoredToken();
  }
}

async function ensureForegroundMessageSubscription(): Promise<void> {
  if (foregroundMessageHub.firebaseUnsubscribe) return;

  if (!foregroundMessageHub.setupPromise) {
    const generation = foregroundMessageHub.generation;

    const setupPromise = Promise.all([
      import('firebase/messaging'),
      getMessagingInstance(),
    ]).then(([{ onMessage }, messaging]) => {
      if (
        foregroundMessageHub.generation !== generation ||
        foregroundMessageHub.firebaseUnsubscribe
      ) {
        return;
      }

      foregroundMessageHub.firebaseUnsubscribe = onMessage(
        messaging,
        (payload) => {
          foregroundMessageHub.callbacks.forEach((callback) => {
            callback(payload);
          });
        },
      );
    });

    foregroundMessageHub.setupPromise = setupPromise;

    const clearSetupPromise = () => {
      if (foregroundMessageHub.setupPromise === setupPromise) {
        foregroundMessageHub.setupPromise = null;
      }
    };

    void setupPromise.then(clearSetupPromise, clearSetupPromise);
  }

  const setupPromise = foregroundMessageHub.setupPromise;
  if (setupPromise) await setupPromise;
}

function resetForegroundMessageHub(): void {
  foregroundMessageHub.generation += 1;
  foregroundMessageHub.callbacks.clear();
  foregroundMessageHub.firebaseUnsubscribe?.();
  foregroundMessageHub.firebaseUnsubscribe = null;
  foregroundMessageHub.setupPromise = null;
}

export async function onForegroundMessage(
  callback: ForegroundMessageCallback,
): Promise<() => void> {
  if (!(await isMessagingSupported())) {
    throw new MessagingUnsupportedError();
  }

  foregroundMessageHub.callbacks.add(callback);

  try {
    await ensureForegroundMessageSubscription();
  } catch (error) {
    foregroundMessageHub.callbacks.delete(callback);
    throw error;
  }

  let isSubscribed = true;

  return () => {
    if (!isSubscribed) return;

    isSubscribed = false;
    foregroundMessageHub.callbacks.delete(callback);
  };
}
