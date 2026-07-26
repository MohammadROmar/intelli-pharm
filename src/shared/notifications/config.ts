import type { FirebaseApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const missingKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

export const isFirebaseConfigValid = missingKeys.length === 0;

if (!isFirebaseConfigValid) {
  console.error(
    `[Firebase] Missing required env vars: ${missingKeys.join(', ')}. FCM will be disabled.`,
  );
}

let appInstance: FirebaseApp | null = null;

export async function getFirebaseApp() {
  if (appInstance) return appInstance;
  if (!isFirebaseConfigValid) {
    throw new Error('[Firebase] Cannot initialize app: invalid config');
  }

  const { initializeApp, getApps } = await import('firebase/app');
  const existingApps = getApps();

  appInstance =
    existingApps.length > 0 ? existingApps[0] : initializeApp(firebaseConfig);

  return appInstance;
}
