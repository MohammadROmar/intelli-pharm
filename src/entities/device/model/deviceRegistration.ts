import {
  getFreshTokenSilently,
  readToken,
  requestNotificationPermission,
  withRegistrationLock,
  writeToken,
} from '@/shared/notifications';

import { updateFcmToken } from '../api/deviceTokenApi';
import {
  getDeviceRegistrationSnapshot,
  setDeviceRegistrationState,
} from './deviceRegistrationStore';

let registrationPromise: Promise<string | null> | null = null;

async function performDeviceRegistration(): Promise<string | null> {
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

    if (token === readToken()) {
      setDeviceRegistrationState('registered');
      return token;
    }

    setDeviceRegistrationState('registering');
    await updateFcmToken(token);

    writeToken(token);
    setDeviceRegistrationState('registered');
    return token;
  } catch (error) {
    setDeviceRegistrationState('error');
    throw error;
  }
}

function runDeviceRegistration(): Promise<string | null> {
  if (registrationPromise) return registrationPromise;

  registrationPromise = withRegistrationLock(performDeviceRegistration).finally(
    () => {
      registrationPromise = null;
    },
  );

  return registrationPromise;
}

export function syncDeviceRegistration(): Promise<string | null> {
  return runDeviceRegistration();
}

export async function registerDeviceNotifications(): Promise<string | null> {
  setDeviceRegistrationState('registering');

  try {
    const permission = await requestNotificationPermission();

    if (permission !== 'granted') {
      setDeviceRegistrationState('unregistered');
      return null;
    }

    return await runDeviceRegistration();
  } catch (error) {
    setDeviceRegistrationState('error');
    throw error;
  }
}
