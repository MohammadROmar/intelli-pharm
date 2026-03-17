import { useEffect, useRef, useState } from 'react';

import DashboardSkeleton from '../layouts/DashboardLayoutSkeleton';
import { LoginSkeleton } from '@/pages/login';
import type { LoginResponse } from '@/features/login';
import {
  setCredentials,
  logout,
  setLoading,
  hasRefreshToken,
} from '@/entities/session';
import { apiClient } from '@/shared/api';
import { useAppDispatch, useAppSelector } from '@/shared/config';

export const AuthLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isLoading, refreshToken } = useAppSelector((state) => state.session);

  const [showDashboardSkeleton] = useState(() => hasRefreshToken());
  const refreshTokenRef = useRef(refreshToken);
  console.log(refreshTokenRef.current);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await apiClient.post<LoginResponse>(
          '/auth/v1/refresh',
          { refresh_token: refreshTokenRef.current },
        );

        if (!data) {
          dispatch(logout());
          return;
        }

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

    if (refreshTokenRef.current) initAuth();
  }, [dispatch]);

  if (isLoading) {
    return (
      <>{showDashboardSkeleton ? <DashboardSkeleton /> : <LoginSkeleton />}</>
    );
  }

  return <>{children}</>;
};
