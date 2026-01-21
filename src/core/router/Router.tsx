import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from '../../shared/layouts/Root';
import DashboardLayout from '../../shared/layouts/Dashboard';

import HomePage from '@/core/pages/Home';
import LoginPage from '@/core/pages/Login';

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
    element: <DashboardLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
