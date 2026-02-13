import { useEffect } from 'react';

import { refreshClient } from '@/shared/api';
import { setCredentials, logout, setLoading } from '@/entities/session';
import { useAppDispatch, useAppSelector } from '@/shared/config';
import DashboardSkeleton from '../layouts/DashboardLayoutSkeleton';

export const AuthLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.session.isLoading);

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
    return <DashboardSkeleton />;
  }

  return <>{children}</>;
};
