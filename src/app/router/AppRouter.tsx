import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from '../layouts/RootLayout';
import PublicOnlyRoute from './PublicOnlyRoute';
import DashboardRoute from './DashboardRoute';
import { LazyErrorPage } from '@/pages/error';
import { LazyNotFoundPage } from '@/pages/not-found';
import { LazyLoginPage } from '@/pages/login';
import { LazyOrdersListPage } from '@/pages/orders-list';
import { LazyLaboratoriesPage } from '@/pages/laboratory';
import { LazyCategoryListPage } from '@/pages/category-list';
import { LazyCategoryCreatePage } from '@/pages/category-create';
import { LazyEmployeeCreatePage } from '@/pages/employee-create';
import { LazyEmployeeListPage } from '@/pages/employee-list';
import { LazyMedicineCreatePage } from '@/pages/medicine-create';
import { LazyMedicineDetailsPage } from '@/pages/medicine-detail';
import { LazyUpdateEmployeePage } from '@/pages/employee-edit';
import { LazyCategoryEditPage } from '@/pages/category-edit';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <LazyErrorPage />,
    children: [
      {
        path: '/',
        element: <PublicOnlyRoute />,
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
        children: [
          { index: true, element: <></> },
          { path: 'orders', element: <LazyOrdersListPage /> },
          { path: 'laboratories', element: <LazyLaboratoriesPage /> },
          {
            path: 'medicines',
            children: [
              { path: 'new', element: <LazyMedicineCreatePage /> },
              { path: ':id', element: <LazyMedicineDetailsPage /> },
            ],
          },
          {
            path: 'categories',
            children: [
              { index: true, element: <LazyCategoryListPage /> },
              {
                path: ':id',
                children: [
                  { index: true, element: <p>CategoryDetails</p> },
                  { path: 'edit', element: <LazyCategoryEditPage /> },
                ],
              },
              { path: 'new', element: <LazyCategoryCreatePage /> },
            ],
          },
          {
            path: 'employees',
            children: [
              { index: true, element: <LazyEmployeeListPage /> },
              {
                path: ':id',
                children: [
                  { index: true, element: <p>EmployeeDetails</p> },
                  { path: 'edit', element: <LazyUpdateEmployeePage /> },
                ],
              },
              { path: 'new', element: <LazyEmployeeCreatePage /> },
            ],
          },
        ],
      },
      { path: '*', element: <LazyNotFoundPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
