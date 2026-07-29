import { Navigate, Outlet } from 'react-router';

import { useAppSelector } from '@/shared/config';

export function PublicRoute() {
  const isAuthenticated = useAppSelector(
    (state) => state.session.isAuthenticated,
  );

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
