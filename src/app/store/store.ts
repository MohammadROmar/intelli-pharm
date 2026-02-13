import { configureStore } from '@reduxjs/toolkit';

import { sessionReducer, logout, setCredentials } from '@/entities/session';
import { apiClient, refreshClient } from '@/shared/api';

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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await refreshClient.post('/api/users/token/refresh');

        store.dispatch(
          setCredentials({
            accessToken: data.accessToken,
            user: data.user,
          }),
        );

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
