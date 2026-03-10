import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PublicOnlyRoute from './PublicOnlyRoute';
import DashboardRoute from './DashboardRoute';
import { LoginPageLazy } from '@/pages/login';
import { LazyErrorPage } from '@/pages/error';
import { LazyNotFoundPage } from '@/pages/not-found';
import { CategoryListPageLazy } from '@/pages/category-list';
import { CategoryCreatePageLazy } from '@/pages/category-create';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicOnlyRoute />,
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
    children: [
      { index: true, element: <></> },
      {
        path: 'categories',
        children: [
          { index: true, element: <CategoryListPageLazy /> },
          { path: ':id', element: <></> },
          { path: 'new', element: <CategoryCreatePageLazy /> },
        ],
      },
    ],
  },
  { path: '*', element: <LazyNotFoundPage /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
