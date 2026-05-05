import type { AxiosRequestConfig } from 'axios';
import { configureStore } from '@reduxjs/toolkit';

import type { LoginResponse } from '@/features/login/index.initial';
import { sessionReducer, logout, setCredentials } from '@/entities/session';
import { apiClient } from '@/shared/api';

export const store = configureStore({
  reducer: { session: sessionReducer },
});

declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}

apiClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.session.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const language = localStorage.getItem('i18nextLng');
  if (language && !config.headers['Accept-Language']) {
    config.headers['Accept-Language'] = language;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    const state = store.getState();

    if (
      error.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/v1/refresh'
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await apiClient.post<LoginResponse>(
          '/auth/v1/refresh',
          { refresh_token: state.session.refreshToken },
        );

        store.dispatch(
          setCredentials({
            accessToken: data!.access_token,
            refreshToken: data!.refresh_token,
            roles: data!.roles,
            user: { email: data!.email, name: data!.name },
          }),
        );

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data!.access_token}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
