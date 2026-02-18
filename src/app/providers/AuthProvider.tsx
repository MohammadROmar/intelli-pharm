import { useEffect, useState } from 'react';

import DashboardSkeleton from '../layouts/DashboardLayoutSkeleton';
import {
  setCredentials,
  logout,
  setLoading,
  hasAuthHint,
} from '@/entities/session';
import { refreshClient } from '@/shared/api';
import { useAppDispatch, useAppSelector } from '@/shared/config';
import { LoginSkeleton } from '@/pages/login';

export const AuthLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.session.isLoading);

  const [showDashboardSkeleton] = useState(() => hasAuthHint());

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await refreshClient.post('/api/users/token/refresh');

        dispatch(
          setCredentials({
            accessToken: data.accessToken,
            user: data.user,
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
    return (
      <>{showDashboardSkeleton ? <DashboardSkeleton /> : <LoginSkeleton />}</>
    );
  }

  return <>{children}</>;
};
