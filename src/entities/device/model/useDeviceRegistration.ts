import { useCallback, useSyncExternalStore } from 'react';

import {
  getDeviceRegistrationSnapshot,
  subscribeToDeviceRegistration,
} from './deviceRegistrationStore';
import { registerDeviceNotifications } from './deviceRegistration';

export function useDeviceRegistration(email: string | null) {
  const state = useSyncExternalStore(
    subscribeToDeviceRegistration,
    getDeviceRegistrationSnapshot,
    getDeviceRegistrationSnapshot,
  );

  const register = useCallback(async () => {
    if (!email) return;

    try {
      await registerDeviceNotifications(email);
    } catch {
      // The controller exposes the failure through the external store. Keep
      // the event handler rejection contained so React does not report an
      // unhandled promise while the retry UI becomes available.
    }
  }, [email]);

  return { state, register };
}
