import {
  createRegistrationFingerprint,
  getFreshTokenSilently,
  readRegistrationFingerprint,
  requestNotificationPermission,
  withRegistrationLock,
  writeRegistrationFingerprint,
} from '@/shared/notifications';

import { updateFcmToken } from '../api/deviceTokenApi';
import {
  getDeviceRegistrationSnapshot,
  setDeviceRegistrationState,
} from './deviceRegistrationStore';

const registrationPromises = new Map<string, Promise<string | null>>();

function normalizeEmail(email: string): string {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error('[FCM] Authenticated user email is unavailable');
  }

  return normalizedEmail;
}

async function performDeviceRegistration(
  email: string,
): Promise<string | null> {
  const previousState = getDeviceRegistrationSnapshot();

  if (previousState !== 'registered') {
    setDeviceRegistrationState('registering');
  }

  try {
    const token = await getFreshTokenSilently();

    if (!token) {
      setDeviceRegistrationState('unregistered');
      return null;
    }

    const fingerprint = await createRegistrationFingerprint(token, email);
    const confirmedFingerprint = readRegistrationFingerprint();

    if (fingerprint === confirmedFingerprint) {
      setDeviceRegistrationState('registered');
      return token;
    }

    setDeviceRegistrationState('registering');
    await updateFcmToken(token);

    writeRegistrationFingerprint(fingerprint);
    setDeviceRegistrationState('registered');
    return token;
  } catch (error) {
    setDeviceRegistrationState('error');
    throw error;
  }
}

function runDeviceRegistration(email: string): Promise<string | null> {
  const registrationKey = normalizeEmail(email);
  const existingPromise = registrationPromises.get(registrationKey);

  if (existingPromise) return existingPromise;

  const registrationPromise: Promise<string | null> = withRegistrationLock(() =>
    performDeviceRegistration(registrationKey),
  ).finally(() => {
    if (registrationPromises.get(registrationKey) === registrationPromise) {
      registrationPromises.delete(registrationKey);
    }
  });

  registrationPromises.set(registrationKey, registrationPromise);
  return registrationPromise;
}

export function syncDeviceRegistration(email: string): Promise<string | null> {
  return runDeviceRegistration(email);
}

export async function registerDeviceNotifications(
  email: string,
): Promise<string | null> {
  setDeviceRegistrationState('registering');

  try {
    const permission = await requestNotificationPermission();

    if (permission !== 'granted') {
      setDeviceRegistrationState('unregistered');
      return null;
    }

    return await runDeviceRegistration(email);
  } catch (error) {
    setDeviceRegistrationState('error');
    throw error;
  }
}
