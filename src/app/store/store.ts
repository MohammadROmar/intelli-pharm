import type { AxiosRequestConfig } from 'axios';
import { configureStore } from '@reduxjs/toolkit';

import type { LoginResponse } from '@/features/login/index.initial';
import { sessionReducer, logout, setCredentials } from '@/entities/session';
import { apiClient, ApiError } from '@/shared/api';

export const store = configureStore({ reducer: { session: sessionReducer } });

declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}

// ─── Refresh Queue ────────────────────────────────────────────────────────────
//
// Problem: When the access token expires, multiple in-flight requests can all
// receive a 401 at the same time. If each attempts its own token refresh, only
// the first will succeed — because rotating refresh tokens are single-use. The
// remaining calls hit a second 401 and incorrectly trigger a logout.
//
// Solution: The first 401 becomes the owner of the refresh. All subsequent 401s
// pause themselves in a queue. When the refresh settles:
//   - Success → every queued request is retried with the new access token.
//   - Failure → every queued request is rejected and the user is logged out once.

type QueueItem = {
  resolve: (accessToken: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let refreshQueue: QueueItem[] = [];

function flushRefreshQueue(accessToken: string): void {
  refreshQueue.forEach(({ resolve }) => resolve(accessToken));
  refreshQueue = [];
}

function rejectRefreshQueue(error: unknown): void {
  refreshQueue.forEach(({ reject }) => reject(error));
  refreshQueue = [];
}

// ─── Request Interceptor ──────────────────────────────────────────────────────

apiClient.interceptors.request.use((config) => {
  const { accessToken } = store.getState().session;
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  const language = localStorage.getItem('i18nextLng');
  if (language && !config.headers['Accept-Language']) {
    config.headers['Accept-Language'] = language;
  }

  return config;
});

// ─── Response Interceptor ─────────────────────────────────────────────────────

type RetryableConfig = AxiosRequestConfig & { _retry?: boolean };

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    // Pass through anything that is not a known ApiError.
    if (!(error instanceof ApiError)) return Promise.reject(error);

    const originalRequest = error.config as RetryableConfig | undefined;

    const shouldAttemptRefresh =
      error.status === 401 &&
      originalRequest != null &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/v1/refresh';

    if (!shouldAttemptRefresh) return Promise.reject(error);

    // ── Case A: A refresh is already in-flight ────────────────────────────────
    // Suspend this request as a promise in the queue. It will be resolved or
    // rejected once the active refresh settles.
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((newAccessToken) => {
        originalRequest._retry = true;
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        return apiClient(originalRequest);
      });
    }

    // ── Case B: This request is the first 401 — it owns the refresh ───────────
    originalRequest._retry = true;
    isRefreshing = true;

    const { refreshToken } = store.getState().session;

    if (!refreshToken) {
      isRefreshing = false;
      store.dispatch(logout());
      return Promise.reject(error);
    }

    try {
      const response = await apiClient.post<LoginResponse>('/auth/v1/refresh', {
        refresh_token: refreshToken,
      });

      if (!response.data) {
        throw new ApiError('unauthorized', 401);
      }

      const loginData = response.data;

      store.dispatch(
        setCredentials({
          accessToken: loginData.access_token,
          refreshToken: loginData.refresh_token,
          roles: loginData.roles,
          user: { email: loginData.email, name: loginData.name },
          unread_notifications_count: loginData.unread_notifications_count,
        }),
      );

      // Unblock all waiting requests with the new token.
      flushRefreshQueue(loginData.access_token);

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${loginData.access_token}`,
      };

      return apiClient(originalRequest);
    } catch (refreshError) {
      // Propagate failure to all waiting requests before logging out.
      rejectRefreshQueue(refreshError);
      store.dispatch(logout());
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
