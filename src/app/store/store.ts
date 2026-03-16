import { configureStore } from '@reduxjs/toolkit';

import { sessionReducer, logout, setCredentials } from '@/entities/session';
import { apiClient } from '@/shared/api';
import type { LoginResponse } from '@/features/login';

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
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const state = store.getState();

    if (error.response?.status === 404 && !originalRequest._retry) {
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
            user: { email: '', name: '' },
          }),
        );

        originalRequest.headers.Authorization = `Bearer ${data!.access_token}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
