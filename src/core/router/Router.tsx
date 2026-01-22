import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProtectedRoute from '@/features/dashboard/components/ProtectedRoute';

import RootLayout from '../../shared/layouts/Root';
const DashboardLayout = lazy(() => import('../../shared/layouts/Dashboard'));

import HomePage from '@/core/pages/Home';
import LoginPage from '@/core/pages/Login';

import DashboardLoader from '@/features/dashboard/components/DashboardLoader';

function WithSuspense({
  loader,
  children,
}: {
  loader?: ReactNode;
  children?: ReactNode;
}) {
  return <Suspense fallback={loader}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <WithSuspense loader={<DashboardLoader />}>
          <DashboardLayout />
        </WithSuspense>
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <HomePage /> }],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
