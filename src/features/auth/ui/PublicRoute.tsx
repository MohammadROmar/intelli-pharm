import { Navigate } from 'react-router-dom';
import type { PropsWithChildren } from 'react';

import { useAppSelector } from '@/shared/config';

export function PublicRoute({ children }: PropsWithChildren) {
  const isAuthenticated = useAppSelector(
    (state) => state.session.isAuthenticated,
  );

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
