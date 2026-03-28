import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PublicOnlyRoute from './PublicOnlyRoute';
import DashboardRoute from './DashboardRoute';

import { LazyRootLayout } from '../layouts/LazyRootLayout';
import { LazyErrorPage } from '@/pages/error';
import { LazyNotFoundPage } from '@/pages/not-found';

import { LazyLoginPage } from '@/pages/login';

import { LazyOrderListPage } from '@/pages/orders-list';

import { LazyLaboratoryListPage } from '@/pages/laboratory-list';
import { LazyLaboratoryDetailPage } from '@/pages/laboratory-detail';

import { LazyCityListPage } from '@/pages/city-list';

import { LazyMedicineListPage } from '@/pages/medicine-list';
import { LazyMedicineCreatePage } from '@/pages/medicine-create';
import { LazyMedicineDetailsPage } from '@/pages/medicine-detail';
import { LazyMedicineEditPage } from '@/pages/medicine-edit';
import { LazyMedicineRestockPage } from '@/pages/medicine-restock';

import { LazyCategoryListPage } from '@/pages/category-list';
import { LazyCategoryCreatePage } from '@/pages/category-create';
import { LazyCategoryDetailPage } from '@/pages/category-detail';
import { LazyCategoryEditPage } from '@/pages/category-edit';

import { LazyEmployeeListPage } from '@/pages/employee-list';
import { LazyEmployeeCreatePage } from '@/pages/employee-create';
import { LazyEmployeeEditPage } from '@/pages/employee-edit';

const router = createBrowserRouter([
  {
    element: <LazyRootLayout />,
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
          { path: 'orders', element: <LazyOrderListPage /> },
          {
            path: 'laboratories',
            children: [
              { index: true, element: <LazyLaboratoryListPage /> },
              { path: ':id', element: <LazyLaboratoryDetailPage /> },
            ],
          },
          { path: 'cities', element: <LazyCityListPage /> },
          {
            path: 'medicines',
            children: [
              { index: true, element: <LazyMedicineListPage /> },
              { path: 'new', element: <LazyMedicineCreatePage /> },
              {
                path: ':id',
                children: [
                  { index: true, element: <LazyMedicineDetailsPage /> },
                  { path: 'edit', element: <LazyMedicineEditPage /> },
                  { path: 'restock', element: <LazyMedicineRestockPage /> },
                ],
              },
            ],
          },
          {
            path: 'categories',
            children: [
              { index: true, element: <LazyCategoryListPage /> },
              {
                path: ':id',
                children: [
                  { index: true, element: <LazyCategoryDetailPage /> },
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
                  { path: 'edit', element: <LazyEmployeeEditPage /> },
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
