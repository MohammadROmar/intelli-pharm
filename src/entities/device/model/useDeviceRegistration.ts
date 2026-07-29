import { useCallback, useSyncExternalStore } from 'react';

import {
  getDeviceRegistrationSnapshot,
  subscribeToDeviceRegistration,
} from './deviceRegistrationStore';
import { registerDeviceNotifications } from './deviceRegistration';

export function useDeviceRegistration() {
  const state = useSyncExternalStore(
    subscribeToDeviceRegistration,
    getDeviceRegistrationSnapshot,
    getDeviceRegistrationSnapshot,
  );

  const register = useCallback(async () => {
    try {
      await registerDeviceNotifications();
    } catch {
      // The controller exposes the failure through the external store
    }
  }, []);

  return { state, register };
}
