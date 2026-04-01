import { apiClient } from '@/shared/api';
import type { LoginResponse } from '@/features/login/index.initial';

let authBootstrapPromise: Promise<LoginResponse> | null = null;
let authBootstrapToken: string | null = null;

export function refreshSessionOnce(refreshToken: string) {
  if (authBootstrapPromise && authBootstrapToken === refreshToken) {
    return authBootstrapPromise;
  }

  authBootstrapToken = refreshToken;

  authBootstrapPromise = apiClient
    .post<LoginResponse>('/auth/v1/refresh', {
      refresh_token: refreshToken,
    })
    .then((res) => {
      if (!res.data) {
        throw new Error('Refresh failed');
      }

      return res.data;
    })
    .finally(() => {
      if (authBootstrapToken === refreshToken) {
        authBootstrapPromise = null;
        authBootstrapToken = null;
      }
    });

  return authBootstrapPromise;
}
