import { useEffect, useRef } from 'react';

import DashboardSkeleton from '../layouts/DashboardLayoutSkeleton';
import { LoginSkeleton } from '@/pages/login';
import type { LoginResponse } from '@/features/login/index.initial';
import { setCredentials, logout, setLoading } from '@/entities/session';
import { apiClient } from '@/shared/api';
import { useAppDispatch, useAppSelector } from '@/shared/config';

export const AuthLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isLoading, refreshToken } = useAppSelector((state) => state.session);

  const refreshTokenRef = useRef(refreshToken);

  useEffect(() => {
    async function refreshToken() {
      if (!refreshTokenRef.current) throw new Error('No refresh token');

      return apiClient.post<LoginResponse>('/auth/v1/refresh', {
        refresh_token: refreshTokenRef.current,
      });
    }

    const initAuth = async () => {
      try {
        const { data } = await refreshToken();

        if (!data) throw new Error('Refresh failed');

        dispatch(
          setCredentials({
            refreshToken: data.refresh_token,
            accessToken: data.access_token,
            roles: data.roles,
            user: { name: data.name, email: data.email },
          }),
        );
      } catch {
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };

    initAuth();
  }, [dispatch]);

  if (isLoading) {
    return <>{refreshToken ? <DashboardSkeleton /> : <LoginSkeleton />}</>;
  }

  return <>{children}</>;
};
