import { useEffect, useRef } from 'react';

import { refreshSessionOnce } from '../lib/authBootstrap';
import { setCredentials, logout, setLoading } from '@/entities/session';
import { useAppDispatch, useAppSelector } from '@/shared/config';
import { Logo } from '@/shared/ui/index.initial';

export const AuthLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isLoading, refreshToken } = useAppSelector((state) => state.session);

  const initialRefreshTokenRef = useRef(refreshToken);

  useEffect(() => {
    const initAuth = async () => {
      const token = initialRefreshTokenRef.current;
      console.log(token);

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
    return (
      <div className="flex h-screen items-center justify-center">
        <Logo withColors className="size-12" />
      </div>
    );
  }

  return <>{children}</>;
};
