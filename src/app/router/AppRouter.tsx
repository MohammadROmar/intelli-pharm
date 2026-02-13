import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from '../layouts/Root';
import { LoginPageLazy } from '@/pages/login';
import { LazyErrorPage } from '@/pages/error';
import { LazyNotFoundPage } from '@/pages/not-found';
import DashboardRoute from './DashboardRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <LazyErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPageLazy />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardRoute />,
    errorElement: <LazyErrorPage />,
    children: [{ index: true, element: <></> }],
  },
  { path: '*', element: <LazyNotFoundPage /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
