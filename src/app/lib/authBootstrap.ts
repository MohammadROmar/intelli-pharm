import { apiClient } from '@/shared/api';
import type { LoginResponse } from '@/features/login/index.initial';

const PENDING_FLAG_KEY = 'intellipharm_auth_refresh_pending';
const PENDING_FLAG_TTL_MS = 30_000;

export function setRefreshPending(): void {
  sessionStorage.setItem(PENDING_FLAG_KEY, Date.now().toString());
}

export function clearRefreshPending(): void {
  sessionStorage.removeItem(PENDING_FLAG_KEY);
}

export function wasRefreshInterrupted(): boolean {
  const raw = sessionStorage.getItem(PENDING_FLAG_KEY);
  if (raw === null) return false;
  return Date.now() - parseInt(raw, 10) < PENDING_FLAG_TTL_MS;
}

let bootstrapPromise: Promise<LoginResponse> | null = null;
let bootstrapToken: string | null = null;

export function refreshSessionOnce(
  refreshToken: string,
): Promise<LoginResponse> {
  if (bootstrapPromise !== null && bootstrapToken === refreshToken) {
    return bootstrapPromise;
  }

  bootstrapToken = refreshToken;
  bootstrapPromise = apiClient
    .post<LoginResponse>('/auth/v1/refresh', { refresh_token: refreshToken })
    .then((res) => {
      if (!res.data) throw new Error('Empty refresh response');
      return res.data;
    })
    .finally(() => {
      if (bootstrapToken === refreshToken) {
        bootstrapPromise = null;
        bootstrapToken = null;
      }
    });

  return bootstrapPromise;
}
