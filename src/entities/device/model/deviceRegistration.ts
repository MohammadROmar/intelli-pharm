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

type SyncDeviceRegistrationOptions = { forceBackendSync?: boolean };

let registrationPromise: Promise<string | null> | null = null;

async function performDeviceRegistration({
  forceBackendSync = false,
}: SyncDeviceRegistrationOptions): Promise<string | null> {
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

    const isAlreadySynced =
      token === readToken() && previousState === 'registered';

    if (!forceBackendSync && isAlreadySynced) return token;

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

function runDeviceRegistration(
  options: SyncDeviceRegistrationOptions,
): Promise<string | null> {
  if (registrationPromise) return registrationPromise;

  registrationPromise = withRegistrationLock(() =>
    performDeviceRegistration(options),
  ).finally(() => {
    registrationPromise = null;
  });

  return registrationPromise;
}

export function syncDeviceRegistration(
  options: SyncDeviceRegistrationOptions = {},
): Promise<string | null> {
  return runDeviceRegistration(options);
}

export async function registerDeviceNotifications(): Promise<string | null> {
  setDeviceRegistrationState('registering');

  try {
    const permission = await requestNotificationPermission();

    if (permission !== 'granted') {
      setDeviceRegistrationState('unregistered');
      return null;
    }

    return await runDeviceRegistration({ forceBackendSync: true });
  } catch (error) {
    setDeviceRegistrationState('error');
    throw error;
  }
}
