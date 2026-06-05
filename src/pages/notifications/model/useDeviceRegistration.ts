import { useCallback, useState } from 'react';

import {
  readToken,
  requestPermissionAndGetToken,
} from '@/shared/notifications';

import { useUpdateFcmTokenMutation } from '@/features/notifications';

export type DeviceRegistrationState =
  | 'registered'
  | 'unregistered'
  | 'registering'
  | 'error';

export function useDeviceRegistration() {
  const [state, setState] = useState<DeviceRegistrationState>(() =>
    readToken() ? 'registered' : 'unregistered',
  );

  const { mutateAsync: updateToken } = useUpdateFcmTokenMutation();

  const register = useCallback(async () => {
    setState('registering');
    try {
      const token = await requestPermissionAndGetToken();

      if (!token) {
        setState('unregistered');
        return;
      }

      await updateToken(token);
      setState('registered');
    } catch {
      setState('error');
    }
  }, [updateToken]);

  return { state, register };
}
