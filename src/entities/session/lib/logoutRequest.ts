import { apiClient } from '@/shared/api';

import { broadcastLogout } from './authBroadcast';

type LogoutPayload = {
  FCMToken: string;
};

export async function logoutRequest(
  fcmToken: string | null = null,
): Promise<{ isError: boolean }> {
  const payload: LogoutPayload | undefined = fcmToken
    ? { FCMToken: fcmToken }
    : undefined;

  try {
    const response = await apiClient.post<null>('/auth/v2/logout', payload, {
      skipAuthRefresh: true,
    });

    if (!response.isSuccess) {
      if (import.meta.env.DEV) {
        console.warn('[auth] logout request was rejected:', response.message);
      }
      return { isError: true };
    }

    broadcastLogout();
    return { isError: false };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[auth] logout request failed:', error);
    }
    return { isError: true };
  }
}
