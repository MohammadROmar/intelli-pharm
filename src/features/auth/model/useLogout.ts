import { useCallback } from 'react';

import { logout } from '@/entities/session';
import { useAppDispatch } from '@/shared/config';
import { revokeFCMToken } from '@/shared/notifications';

export function useLogout() {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    void revokeFCMToken();

    dispatch(logout());
  }, [dispatch]);
}
