import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ChatRoute } from '../config/ChatRoute';
import { PublicRoute } from '../config/PublicRoute';
import { ProtectedRoute } from '../config/ProtectedRoute';
import { DashboardRoute } from '../config/DashboardRoute';

import { LazyRootLayout } from '../../../layouts/LazyRootLayout';

import { LazyErrorPage } from '@/pages/error';
import { LazyNotFoundPage } from '@/pages/not-found';

import { LazyLoginPage } from '@/pages/login';

import { LazyOrderListPage } from '@/pages/order-list';
import { LazyOrderDetailPage } from '@/pages/order-detail';

import { LazyLaboratoryListPage } from '@/pages/laboratory-list';
import { LazyLaboratoryDetailPage } from '@/pages/laboratory-detail';

import { LazyCityListPage } from '@/pages/city-list';

import { LazyDeliveryListPage } from '@/pages/delivery-list';
import { LazyDeliveryDetailPage } from '@/pages/delivery-detail';
import { LazyDeliveryAssignPage } from '@/pages/delivery-assign';

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
import { LazyEmployeeDetailPage } from '@/pages/employee-detail';

import { LazyGiftListPage } from '@/pages/gift-list';
import { LazyGiftDetailPage } from '@/pages/gift-detail';

import { LazyOfferListPage } from '@/pages/offer-list';
import { LazyOfferDetailPage } from '@/pages/offer-detail';
import { LazyOfferGiftCreatePage } from '@/pages/offer-gift-create';
import { LazyOfferPercentageCreatePage } from '@/pages/offer-percentage-create';

import { LazyTargetListPage } from '@/pages/target-list';
import { LazyTargetDetailPage } from '@/pages/target-detail';
import { LazyTargetAchievementListPage } from '@/pages/target-achievement';

import { LazyChatPage } from '@/pages/ai-chat';

import { LazyNotificationsPage } from '@/pages/notifications';

import { LazyPlanListPage } from '@/pages/plan-list';
import { LazyPlanDetailPage } from '@/pages/plan-detail';
import { LazyInitiatePlanPage } from '@/pages/plan-initiate';

import { LazySeasonalMetricsPage } from '@/pages/metrics-seasonal';
import { LazyMedicineMetricsPage } from '@/pages/metrics-medicine';
import { LazyAreaMetricsPage } from '@/pages/metrics-area';
import { LazyPharmacyMetricsPage } from '@/pages/metrics-pharmacy';

const router = createBrowserRouter([
  {
    element: <LazyRootLayout />,
    errorElement: <LazyErrorPage />,
    children: [
      {
        path: '/',
        element: <PublicRoute />,
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
              {
                index: true,
                element: <></>,
              },

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
                path: 'metrics',
                children: [
                  { index: true, element: <LazyNotFoundPage minimal /> },
                  { path: 'seasonal', element: <LazySeasonalMetricsPage /> },
                  { path: 'medicine', element: <LazyMedicineMetricsPage /> },
                  { path: 'area', element: <LazyAreaMetricsPage /> },
                  { path: 'pharmacy', element: <LazyPharmacyMetricsPage /> },
                ],
              },

              {
                path: 'deliveries',
                children: [
                  { index: true, element: <LazyDeliveryListPage /> },
                  { path: ':id', element: <LazyDeliveryDetailPage /> },
                  { path: 'assign', element: <LazyDeliveryAssignPage /> },
                ],
              },

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
                path: 'promotions/gifts',
                children: [
                  { index: true, element: <LazyGiftListPage /> },
                  { path: ':id', element: <LazyGiftDetailPage /> },
                ],
              },

              {
                path: 'promotions/offers',
                children: [
                  { index: true, element: <LazyOfferListPage /> },
                  { path: ':id', element: <LazyOfferDetailPage /> },
                  {
                    path: 'new-percentage',
                    element: <LazyOfferPercentageCreatePage />,
                  },
                  { path: 'new-gifts', element: <LazyOfferGiftCreatePage /> },
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
                path: 'targets',
                children: [
                  { index: true, element: <LazyTargetListPage /> },
                  {
                    path: ':id',
                    children: [
                      { index: true, element: <LazyTargetDetailPage /> },
                      {
                        path: 'achievements',
                        element: <LazyTargetAchievementListPage />,
                      },
                    ],
                  },
                ],
              },

              {
                path: 'employees',
                children: [
                  { index: true, element: <LazyEmployeeListPage /> },
                  {
                    path: ':id',
                    children: [
                      { index: true, element: <LazyEmployeeDetailPage /> },
                      { path: 'edit', element: <LazyEmployeeEditPage /> },
                    ],
                  },
                  { path: 'new', element: <LazyEmployeeCreatePage /> },
                ],
              },

              { path: 'notifications', element: <LazyNotificationsPage /> },

              {
                path: 'plans',
                children: [
                  { index: true, element: <LazyPlanListPage /> },
                  { path: 'initiate', element: <LazyInitiatePlanPage /> },
                  { path: ':id', element: <LazyPlanDetailPage /> },
                ],
              },

              { path: '*', element: <LazyNotFoundPage minimal /> },
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
