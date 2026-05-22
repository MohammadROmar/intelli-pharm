import { lazy, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/shared/config';

const ForegroundNotificationListener = lazy(() =>
  import('@/features/notifications').then((module) => ({
    default: module.ForegroundNotificationListener,
  })),
);

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector(
    (state) => state.session.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Outlet />

      <Suspense fallback={null}>
        <ForegroundNotificationListener />
      </Suspense>
    </>
  );
}
