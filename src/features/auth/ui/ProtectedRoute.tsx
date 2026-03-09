// import { Navigate } from 'react-router-dom';
import type { PropsWithChildren } from 'react';

import { useAppSelector } from '@/shared/config';

export function ProtectedRoute({ children }: PropsWithChildren) {
  const isAuthenticated = useAppSelector(
    (state) => state.session.isAuthenticated,
  );

  if (isAuthenticated) {
    return <>{children}</>;
  }

  // return <Navigate to="/" replace />;
  return <>{children}</>;
}
