import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PublicOnlyRoute from './PublicOnlyRoute';
import DashboardRoute from './DashboardRoute';
import { LazyOrdersListPage } from '@/pages/orders-list';
import { LazyLoginPage } from '@/pages/login';
import { LazyErrorPage } from '@/pages/error';
import { LazyNotFoundPage } from '@/pages/not-found';
import { LazyCategoryListPage } from '@/pages/category-list';
import { LazyCategoryCreatePage } from '@/pages/category-create';
import { LazyEmployeeCreatePage } from '@/pages/emploee-create';
import { LazyEmployeeListPage } from '@/pages/employee-list';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicOnlyRoute />,
    errorElement: <LazyErrorPage />,
    children: [
      {
        index: true,
        element: <LazyLoginPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardRoute />,
    errorElement: <LazyErrorPage />,
    children: [
      { index: true, element: <></> },
      { path: 'orders', element: <LazyOrdersListPage /> },
      {
        path: 'categories',
        children: [
          { index: true, element: <LazyCategoryListPage /> },
          { path: 'new', element: <LazyCategoryCreatePage /> },
        ],
      },
      {
        path: 'employees',
        children: [
          { index: true, element: <LazyEmployeeListPage /> },
          { path: 'new', element: <LazyEmployeeCreatePage /> },
        ],
      },
    ],
  },
  { path: '*', element: <LazyNotFoundPage /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
