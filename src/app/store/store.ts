import { configureStore } from '@reduxjs/toolkit';

import {
  sessionReducer,
  logout,
  setCredentials,
  toSessionCredentials,
} from '@/entities/session';
import { LANGUAGE_CHANGE_EVENT, getInitialLng } from '@/shared/lib';
import { apiClient, ApiError, type RequestConfig } from '@/shared/api';

import { coordinatedRefresh } from '../lib/authRefreshCoordinator';

export const store = configureStore({ reducer: { session: sessionReducer } });

declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}

// ─── 401 Handling ─────────────────────────────────────────────────────────
// Refreshing is delegated entirely to coordinatedRefresh() to seamlessly handle
// concurrent 401s, same-tab dedup, and cross-tab locking.

// ─── Current language, kept live ────────────────────────────────────────────
// Read once at module load to avoid importing i18next directly (preventing
// bundle bloat/circular dependencies), then kept current by the
// app:languageChanged event.
let currentLanguage = getInitialLng();

if (typeof window !== 'undefined') {
  window.addEventListener(LANGUAGE_CHANGE_EVENT, (event) => {
    const detail = (event as CustomEvent<string>).detail;
    if (typeof detail === 'string' && detail.length > 0) {
      currentLanguage = detail;
    }
  });
}

// ─── Request Interceptor ──────────────────────────────────────────────────────

apiClient.interceptors.request.use((config) => {
  const { accessToken } = store.getState().session;
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  if (currentLanguage && !config.headers['Accept-Language']) {
    config.headers['Accept-Language'] = currentLanguage;
  }

  return config;
});

// ─── Response Interceptor ─────────────────────────────────────────────────────

type RetryableConfig = RequestConfig & { _retry?: boolean };

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!(error instanceof ApiError)) return Promise.reject(error);

    const originalRequest = error.config as RetryableConfig | undefined;

    // `skipAuthRefresh` opts out public endpoints (login, register).
    // The '/auth/v2/refresh' check is a structural failsafe against infinite
    // refresh loops if the refresh request itself fails.
    const shouldAttemptRefresh =
      error.status === 401 &&
      originalRequest != null &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh &&
      originalRequest.url !== '/auth/v2/refresh';

    if (!shouldAttemptRefresh) return Promise.reject(error);

    originalRequest._retry = true;

    try {
      const data = await coordinatedRefresh();

      store.dispatch(setCredentials(toSessionCredentials(data)));

      // Retrying through apiClient(originalRequest) automatically runs the request
      // interceptor again, which reads the new accessToken and sets the header.
      return apiClient(originalRequest);
    } catch (refreshError) {
      // Guard against dispatching logout more than once if coordinatedRefresh()
      // rejects multiple concurrent awaiters at the same time.
      if (store.getState().session.isAuthenticated) {
        store.dispatch(logout());
      }
      return Promise.reject(refreshError);
    }
  },
);
