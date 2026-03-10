import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PublicOnlyRoute from './PublicOnlyRoute';
import DashboardRoute from './DashboardRoute';
import { LazyLoginPage } from '@/pages/login';
import { LazyErrorPage } from '@/pages/error';
import { LazyNotFoundPage } from '@/pages/not-found';
import { LazyCategoryListPage } from '@/pages/category-list';
import { LazyCategoryCreatePage } from '@/pages/category-create';
import { LazyEmployeeCreatePage } from '@/pages/emploee-create';

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
      {
        path: 'categories',
        children: [
          { index: true, element: <LazyCategoryListPage /> },
          { path: 'new', element: <LazyCategoryCreatePage /> },
        ],
      },
      {
        path: 'employees',
        children: [{ path: 'new', element: <LazyEmployeeCreatePage /> }],
      },
    ],
  },
  { path: '*', element: <LazyNotFoundPage /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
