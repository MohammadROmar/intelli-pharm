import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { resetDeviceRegistrationState } from '@/entities/device';
import { logout, logoutRequest } from '@/entities/session';
import { useAppDispatch } from '@/shared/config';

type NotificationsModule = typeof import('@/shared/notifications');

function warnInDevelopment(message: string, error: unknown): void {
  if (import.meta.env.DEV) {
    console.warn(message, error);
  }
}

async function loadNotificationsModule(): Promise<NotificationsModule | null> {
  try {
    return await import('@/shared/notifications');
  } catch (error) {
    warnInDevelopment(
      '[auth] Failed to load notifications during logout',
      error,
    );
    return null;
  }
}

async function readTokenForRevocation(
  notifications: NotificationsModule | null,
): Promise<string | null> {
  if (!notifications) return null;

  const confirmedToken = notifications.readToken();
  if (confirmedToken) return confirmedToken;

  try {
    return await notifications.getFreshTokenSilently();
  } catch (error) {
    warnInDevelopment(
      '[auth] Failed to retrieve the notification token during logout',
      error,
    );
    return null;
  }
}

export function useLogout() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useCallback(async () => {
    const notifications = await loadNotificationsModule();

    const performLogout = async () => {
      const fcmToken = await readTokenForRevocation(notifications);
      const result = await logoutRequest(fcmToken);

      if (result.isError) return result;

      try {
        await notifications?.unregisterToken();
      } finally {
        resetDeviceRegistrationState();
        dispatch(logout());
        queryClient.clear();
      }

      return result;
    };

    if (!notifications) return performLogout();

    return notifications.withRegistrationLock(performLogout);
  }, [dispatch, queryClient]);
}
