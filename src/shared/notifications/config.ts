import type { FirebaseApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const FIREBASE_NOTIFICATIONS_APP_NAME = 'intelli-pharm-notifications';
const REQUIRED_FIREBASE_CONFIG_KEYS = [
  'apiKey',
  'projectId',
  'messagingSenderId',
  'appId',
] as const;

export const missingFirebaseConfigKeys = REQUIRED_FIREBASE_CONFIG_KEYS.filter(
  (key) => {
    const value = firebaseConfig[key];
    return typeof value !== 'string' || value.trim().length === 0;
  },
);

export const isFirebaseConfigValid = missingFirebaseConfigKeys.length === 0;

if (!isFirebaseConfigValid) {
  console.error(
    `[Firebase] Missing required notification config: ${missingFirebaseConfigKeys.join(', ')}. FCM is disabled.`,
  );
}

let appPromise: Promise<FirebaseApp> | null = null;

async function initializeFirebaseApp(): Promise<FirebaseApp> {
  if (!isFirebaseConfigValid) {
    throw new Error('[Firebase] Cannot initialize app: invalid config');
  }

  const { getApps, initializeApp } = await import('firebase/app');
  const existingApp = getApps().find(
    (app) =>
      app.options.appId === firebaseConfig.appId &&
      app.options.projectId === firebaseConfig.projectId,
  );

  return (
    existingApp ??
    initializeApp(firebaseConfig, FIREBASE_NOTIFICATIONS_APP_NAME)
  );
}

export function getFirebaseApp(): Promise<FirebaseApp> {
  if (!appPromise) {
    appPromise = initializeFirebaseApp().catch((error) => {
      appPromise = null;
      throw error;
    });
  }

  return appPromise;
}
