import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { logout, logoutRequest } from '@/entities/session';
import { useAppDispatch } from '@/shared/config';

export function useLogout() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useCallback(async () => {
    const result = await logoutRequest();

    if (!result.isError) {
      dispatch(logout());

      queryClient.clear();

      try {
        const { unregisterToken } = await import('@/shared/notifications');
        await unregisterToken();
      } catch (error) {
        console.warn('Failed to revoke FCM token during logout:', error);
      }
    }

    return result;
  }, [dispatch, queryClient]);
}
