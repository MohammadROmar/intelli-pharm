import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/shared/config';

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector(
    (state) => state.session.isAuthenticated,
  );

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}
