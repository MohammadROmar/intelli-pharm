import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProtectedRoute from '@/features/dashboard/components/ProtectedRoute';

import RootLayout from '@/shared/layouts/Root';
const DashboardRoute = lazy(
  () => import('@/features/dashboard/components/DashboardRoute'),
);

const LoginPage = lazy(() => import('@/core/pages/Login'));
const NotFoundPage = lazy(() => import('@/core/pages/NotFound'));
const ErrorPage = lazy(() => import('@/core/pages/Error'));

import DashboardSkeleton from '@/features/dashboard/components/DashboardSkeleton';
import LoginSkeleton from '@/shared/components/LoginSkeleton';
import WithSuspense from '@/shared/components/WithSuspense';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <WithSuspense Component={ErrorPage} />,
    children: [
      {
        index: true,
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
    errorElement: <WithSuspense Component={ErrorPage} />,
    children: [{ index: true, element: <></> }],
  },
  { path: '*', element: <WithSuspense Component={NotFoundPage} /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
