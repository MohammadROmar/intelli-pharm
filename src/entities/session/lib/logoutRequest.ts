import { apiClient } from '@/shared/api';

import { broadcastLogout } from './authBroadcast';

export async function logoutRequest(): Promise<{ isError: boolean }> {
  try {
    await apiClient.post('/auth/v2/logout', undefined, {
      skipAuthRefresh: true,
    });
    return { isError: false };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[auth] logout request failed:', error);
    }
    return { isError: true };
  } finally {
    broadcastLogout();
  }
}
