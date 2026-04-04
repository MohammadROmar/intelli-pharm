import { useEffect, useRef } from 'react';

import { refreshSessionOnce } from '../lib/authBootstrap';
import DashboardSkeleton from '../layouts/DashboardLayoutSkeleton';
import { ChatLayoutSkeleton } from '@/pages/ai-chat';
import { LoginSkeleton } from '@/pages/login';
import { setCredentials, logout, setLoading } from '@/entities/session';
import { useAppDispatch, useAppSelector } from '@/shared/config';

export const AuthLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isLoading, refreshToken } = useAppSelector((state) => state.session);

  const initialRefreshTokenRef = useRef(refreshToken);

  useEffect(() => {
    const initAuth = async () => {
      const token = initialRefreshTokenRef.current;

      if (!token) {
        dispatch(logout());
        return;
      }

      try {
        const data = await refreshSessionOnce(token);

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
    const isChat = window.location.pathname.startsWith('/chat');
    const AuthSkeleton = isChat ? ChatLayoutSkeleton : DashboardSkeleton;

    return <>{refreshToken ? <AuthSkeleton /> : <LoginSkeleton />}</>;
  }

  return <>{children}</>;
};
