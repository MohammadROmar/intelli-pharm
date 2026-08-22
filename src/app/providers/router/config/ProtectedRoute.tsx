import { lazy, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router';

import { useAppSelector } from '@/shared/config';
import { ErrorBoundary } from '@/shared/lib';

const ForegroundNotificationListener = lazy(() =>
  import('@/features/notifications').then((module) => ({
    default: module.ForegroundNotificationListener,
  })),
);

function StockNotificationListenerGate() {
  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <ForegroundNotificationListener />
      </Suspense>
    </ErrorBoundary>
  );
}

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
      <StockNotificationListenerGate />
    </>
  );
}
