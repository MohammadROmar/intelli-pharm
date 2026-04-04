import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ProtectedRoute } from '@/features/auth/index.initial';
import PublicOnlyRoute from './PublicOnlyRoute';
import DashboardRoute from './DashboardRoute';
import ChatRoute from './ChatRoute';

import { LazyRootLayout } from '../layouts/LazyRootLayout';
import { LazyErrorPage } from '@/pages/error';
import { LazyNotFoundPage } from '@/pages/not-found';

import { LazyLoginPage } from '@/pages/login';

import { LazyOrderListPage } from '@/pages/order-list';
import { LazyOrderDetailPage } from '@/pages/order-detail';

import { LazyLaboratoryListPage } from '@/pages/laboratory-list';
import { LazyLaboratoryDetailPage } from '@/pages/laboratory-detail';

import { LazyCityListPage } from '@/pages/city-list';

import { LazyRegionListPage } from '@/pages/region-list';
import { LazyRegionCreatePage } from '@/pages/region-create';
import { LazyRegionEditPage } from '@/pages/region-edit';
import { LazyRegionDetailPage } from '@/pages/region-detail';

import { LazyPharmacyListPage } from '@/pages/pharmacy-list';
import { LazyPharmacyCreatePage } from '@/pages/pharmacy-create';
import { LazyPharmacyDetailPage } from '@/pages/pharmacy-detail';
import { LazyPharmacyEditPage } from '@/pages/pharmacy-edit';

import { LazyMedicineListPage } from '@/pages/medicine-list';
import { LazyMedicineCreatePage } from '@/pages/medicine-create';
import { LazyMedicineDetailPage } from '@/pages/medicine-detail';
import { LazyMedicineEditPage } from '@/pages/medicine-edit';
import { LazyMedicineRestockPage } from '@/pages/medicine-restock';
import { LazyMedicineScanPage } from '@/pages/medicine-scan';
import { LazyMedicineScanResultPage } from '@/pages/medicine-scan-result';

import { LazyCategoryListPage } from '@/pages/category-list';
import { LazyCategoryCreatePage } from '@/pages/category-create';
import { LazyCategoryDetailPage } from '@/pages/category-detail';
import { LazyCategoryEditPage } from '@/pages/category-edit';

import { LazyEmployeeListPage } from '@/pages/employee-list';
import { LazyEmployeeCreatePage } from '@/pages/employee-create';
import { LazyEmployeeEditPage } from '@/pages/employee-edit';

import { LazyChatPage } from '@/pages/ai-chat';

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
        element: <ProtectedRoute />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardRoute />,
            children: [
              { index: true, element: <></> },

              {
                path: 'orders',
                children: [
                  { index: true, element: <LazyOrderListPage /> },
                  { path: ':id', element: <LazyOrderDetailPage /> },
                ],
              },

              {
                path: 'laboratories',
                children: [
                  { index: true, element: <LazyLaboratoryListPage /> },
                  { path: ':id', element: <LazyLaboratoryDetailPage /> },
                ],
              },

              { path: 'cities', element: <LazyCityListPage /> },

              {
                path: 'regions',
                children: [
                  { index: true, element: <LazyRegionListPage /> },
                  { path: 'new', element: <LazyRegionCreatePage /> },
                  {
                    path: ':id',
                    children: [
                      { index: true, element: <LazyRegionDetailPage /> },
                      { path: 'edit', element: <LazyRegionEditPage /> },
                    ],
                  },
                ],
              },

              {
                path: 'pharmacies',
                children: [
                  { index: true, element: <LazyPharmacyListPage /> },
                  { path: 'new', element: <LazyPharmacyCreatePage /> },
                  {
                    path: ':id',
                    children: [
                      { index: true, element: <LazyPharmacyDetailPage /> },
                      { path: 'edit', element: <LazyPharmacyEditPage /> },
                    ],
                  },
                ],
              },
              {
                path: 'medicines',
                children: [
                  { index: true, element: <LazyMedicineListPage /> },
                  { path: 'new', element: <LazyMedicineCreatePage /> },
                  {
                    path: ':id',
                    children: [
                      { index: true, element: <LazyMedicineDetailPage /> },
                      { path: 'edit', element: <LazyMedicineEditPage /> },
                      { path: 'restock', element: <LazyMedicineRestockPage /> },
                    ],
                  },
                  {
                    path: 'scan',
                    children: [
                      { index: true, element: <LazyMedicineScanPage /> },
                      {
                        path: ':barcode',
                        element: <LazyMedicineScanResultPage />,
                      },
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

          {
            path: 'chat',
            element: <ChatRoute />,
            children: [{ index: true, element: <LazyChatPage /> }],
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
