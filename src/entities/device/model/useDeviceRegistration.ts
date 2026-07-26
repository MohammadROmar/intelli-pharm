import { useCallback, useSyncExternalStore } from 'react';

import { requestPermissionAndGetToken } from '@/shared/notifications';

import { useUpdateFcmTokenMutation } from '../api/useUpdateFcmTokenMutation';
import {
  subscribeToDeviceRegistration,
  getDeviceRegistrationSnapshot,
  setDeviceRegistrationState,
} from './deviceRegistrationStore';

export function useDeviceRegistration() {
  const state = useSyncExternalStore(
    subscribeToDeviceRegistration,
    getDeviceRegistrationSnapshot,
  );

  const { mutateAsync: updateToken } = useUpdateFcmTokenMutation();

  const register = useCallback(async () => {
    setDeviceRegistrationState('registering');
    try {
      const token = await requestPermissionAndGetToken();

      if (!token) {
        setDeviceRegistrationState('unregistered');
        return;
      }

      await updateToken(token);
      setDeviceRegistrationState('registered');
    } catch {
      setDeviceRegistrationState('error');
    }
  }, [updateToken]);

  return { state, register };
}
