import { lazy, Suspense, type ElementType, type ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProtectedRoute from '@/features/dashboard/components/ProtectedRoute';

import RootLayout from '@/shared/layouts/Root';
const DashboardRoute = lazy(
  () => import('@/features/dashboard/components/DashboardRoute'),
);

import HomePage from '@/core/pages/Home';
const LoginPage = lazy(() => import('@/core/pages/Login'));
const NotFoundPage = lazy(() => import('@/core/pages/NotFound'));

import DashboardSkeleton from '@/features/dashboard/components/DashboardSkeleton';
import LoginSkeleton from '@/shared/components/LoginSkeleton';

function WithSuspense({
  loader,
  Component,
}: {
  loader?: ReactNode;
  Component: ElementType;
}) {
  return (
    <Suspense fallback={loader}>
      <Component />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/login',
        element: (
          <WithSuspense Component={LoginPage} loader={<LoginSkeleton />} />
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <WithSuspense
          Component={DashboardRoute}
          loader={<DashboardSkeleton />}
        />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <HomePage /> }],
  },
  { path: '*', element: <WithSuspense Component={NotFoundPage} /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
