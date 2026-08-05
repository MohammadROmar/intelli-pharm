import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { ChatRoute } from '../config/ChatRoute';
import { PublicRoute } from '../config/PublicRoute';
import { ProtectedRoute } from '../config/ProtectedRoute';
import { DashboardRoute } from '../config/DashboardRoute';
// import { PermissionRoute } from '../config/PermissionRoute';

import { LazyRootLayout } from '../../../layouts/LazyRootLayout';

import type { ScrollRestorationHandle } from '@/shared/lib';

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
import { LazyInitiatePlanFromDeliveriesPage } from '@/pages/plan-initiate-from-deliveries';

import { LazyLiveTrackingPage } from '@/pages/live-tracking';

import { LazySeasonalMetricsPage } from '@/pages/metrics-seasonal';
import { LazyMedicineMetricsPage } from '@/pages/metrics-medicine';
import { LazyAreaMetricsPage } from '@/pages/metrics-area';
import { LazyPharmacyMetricsPage } from '@/pages/metrics-pharmacy';

import { LazyOverviewPage } from '@/pages/dashboard-overview';

import { LazyRoleListPage } from '@/pages/role-list';
import { LazyRoleCreatePage } from '@/pages/role-create';
import { LazyRoleDetailPage } from '@/pages/role-detail';
import { LazyRoleEditPage } from '@/pages/role-edit';

import { FOCUS_PARAM } from '@/features/live-tracking-roster';
import { withPermission } from '../config/withPermission';

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
            handle: withPermission('dashboard.access'),
            children: [
              {
                // element: <PermissionRoute />,
                lazy: () => import('../config/PermissionRoute'),
                children: [
                  {
                    index: true,
                    lazy: () => import('../config/DashboardLandingRoute'),
                  },

                  {
                    path: 'overview',
                    element: <LazyOverviewPage />,
                    handle: withPermission('dashboard.overview'),
                  },

                  {
                    path: 'tracking',
                    element: <LazyLiveTrackingPage />,
                    handle: {
                      ...withPermission('tracking.view_live'),
                      scrollRestoration: { ignoreSearchParams: [FOCUS_PARAM] },
                    } satisfies ScrollRestorationHandle,
                  },

                  {
                    path: 'orders',
                    children: [
                      {
                        index: true,
                        element: <LazyOrderListPage />,
                        handle: withPermission([
                          'erp.orders.view',
                          'erp.orders.view.own',
                        ]),
                      },
                      {
                        path: ':id',
                        element: <LazyOrderDetailPage />,
                        handle: withPermission([
                          'erp.orders.view',
                          'erp.orders.view.own',
                        ]),
                      },
                    ],
                  },

                  {
                    path: 'laboratories',
                    children: [
                      {
                        index: true,
                        element: <LazyLaboratoryListPage />,
                        handle: withPermission('erp.laboratories.view'),
                      },
                      {
                        path: ':id',
                        element: <LazyLaboratoryDetailPage />,
                        handle: withPermission('erp.laboratories.view'),
                      },
                    ],
                  },

                  {
                    path: 'cities',
                    element: <LazyCityListPage />,
                    handle: withPermission('erp.cities.view'),
                  },

                  {
                    path: 'metrics',
                    children: [
                      { index: true, element: <LazyNotFoundPage minimal /> },
                      {
                        path: 'seasonal',
                        element: <LazySeasonalMetricsPage />,
                        handle: withPermission('crm.analytics.view'),
                      },
                      {
                        path: 'medicine',
                        element: <LazyMedicineMetricsPage />,
                        handle: withPermission('crm.analytics.view'),
                      },
                      {
                        path: 'area',
                        element: <LazyAreaMetricsPage />,
                        handle: withPermission('crm.analytics.view'),
                      },
                      {
                        path: 'pharmacy',
                        element: <LazyPharmacyMetricsPage />,
                        handle: withPermission('crm.analytics.view'),
                      },
                    ],
                  },

                  {
                    path: 'deliveries',
                    children: [
                      {
                        index: true,
                        element: <LazyDeliveryListPage />,
                        handle: withPermission('planner.deliveries.view_all'),
                      },
                      {
                        path: ':id',
                        element: <LazyDeliveryDetailPage />,
                        handle: withPermission('planner.deliveries.view_all'),
                      },
                      {
                        path: 'assign',
                        element: <LazyDeliveryAssignPage />,
                        handle: withPermission('erp.orders.assign_distributor'),
                      },
                    ],
                  },

                  {
                    path: 'regions',
                    children: [
                      {
                        index: true,
                        element: <LazyRegionListPage />,
                        handle: withPermission('erp.regions.view'),
                      },
                      {
                        path: 'new',
                        element: <LazyRegionCreatePage />,
                        handle: withPermission('erp.regions.create'),
                      },
                      {
                        path: ':id',
                        children: [
                          {
                            index: true,
                            element: <LazyRegionDetailPage />,
                            handle: withPermission('erp.regions.view'),
                          },
                          {
                            path: 'edit',
                            element: <LazyRegionEditPage />,
                            handle: withPermission('erp.regions.update'),
                          },
                        ],
                      },
                    ],
                  },

                  {
                    path: 'pharmacies',
                    children: [
                      {
                        index: true,
                        element: <LazyPharmacyListPage />,
                        handle: withPermission('erp.pharmacies.view'),
                      },
                      {
                        path: 'new',
                        element: <LazyPharmacyCreatePage />,
                        handle: withPermission('erp.pharmacies.create'),
                      },
                      {
                        path: ':id',
                        children: [
                          {
                            index: true,
                            element: <LazyPharmacyDetailPage />,
                            handle: withPermission('erp.pharmacies.view'),
                          },
                          {
                            path: 'edit',
                            element: <LazyPharmacyEditPage />,
                            handle: withPermission('erp.pharmacies.update'),
                          },
                        ],
                      },
                    ],
                  },

                  {
                    path: 'medicines',
                    children: [
                      {
                        index: true,
                        element: <LazyMedicineListPage />,
                        handle: withPermission('erp.medicines.view'),
                      },
                      {
                        path: 'new',
                        element: <LazyMedicineCreatePage />,
                        handle: withPermission('erp.medicines.create'),
                      },
                      {
                        path: ':id',
                        children: [
                          {
                            index: true,
                            element: <LazyMedicineDetailPage />,
                            handle: withPermission('erp.medicines.view'),
                          },
                          {
                            path: 'edit',
                            element: <LazyMedicineEditPage />,
                            handle: withPermission('erp.medicines.update'),
                          },
                          {
                            path: 'restock',
                            element: <LazyMedicineRestockPage />,
                            handle: withPermission('erp.stock.update'),
                          },
                        ],
                      },
                      {
                        path: 'scan',
                        children: [
                          {
                            index: true,
                            element: <LazyMedicineScanPage />,
                            handle: withPermission('erp.medicines.view'),
                          },
                          {
                            path: ':barcode',
                            element: <LazyMedicineScanResultPage />,
                            handle: withPermission('erp.medicines.view'),
                          },
                        ],
                      },
                    ],
                  },

                  {
                    path: 'promotions/gifts',
                    children: [
                      {
                        index: true,
                        element: <LazyGiftListPage />,
                        handle: withPermission('erp.gifts.view'),
                      },
                      {
                        path: ':id',
                        element: <LazyGiftDetailPage />,
                        handle: withPermission('erp.gifts.view'),
                      },
                    ],
                  },

                  {
                    path: 'promotions/offers',
                    children: [
                      {
                        index: true,
                        element: <LazyOfferListPage />,
                        handle: withPermission('erp.offers.view'),
                      },
                      {
                        path: ':id',
                        element: <LazyOfferDetailPage />,
                        handle: withPermission('erp.offers.view'),
                      },
                      {
                        path: 'new-percentage',
                        element: <LazyOfferPercentageCreatePage />,
                        handle: withPermission('erp.offers.create'),
                      },
                      {
                        path: 'new-gifts',
                        element: <LazyOfferGiftCreatePage />,
                        handle: withPermission('erp.offers.create'),
                      },
                    ],
                  },

                  {
                    path: 'categories',
                    children: [
                      {
                        index: true,
                        element: <LazyCategoryListPage />,
                        handle: withPermission('erp.categories.view'),
                      },
                      {
                        path: ':id',
                        children: [
                          {
                            index: true,
                            element: <LazyCategoryDetailPage />,
                            handle: withPermission('erp.categories.view'),
                          },
                          {
                            path: 'edit',
                            element: <LazyCategoryEditPage />,
                            handle: withPermission('erp.categories.update'),
                          },
                        ],
                      },
                      {
                        path: 'new',
                        element: <LazyCategoryCreatePage />,
                        handle: withPermission('erp.categories.create'),
                      },
                    ],
                  },

                  {
                    path: 'targets',
                    children: [
                      {
                        index: true,
                        element: <LazyTargetListPage />,
                        handle: withPermission('erp.targets.view'),
                      },
                      {
                        path: ':id',
                        children: [
                          {
                            index: true,
                            element: <LazyTargetDetailPage />,
                            handle: withPermission('erp.targets.view'),
                          },
                          {
                            path: 'achievements',
                            element: <LazyTargetAchievementListPage />,
                            handle: withPermission('erp.targets.view'),
                          },
                        ],
                      },
                    ],
                  },

                  {
                    path: 'employees',
                    children: [
                      {
                        index: true,
                        element: <LazyEmployeeListPage />,
                        handle: withPermission([
                          'erp.employees.view',
                          'erp.employees.view.own',
                        ]),
                      },
                      {
                        path: ':id',
                        children: [
                          {
                            index: true,
                            element: <LazyEmployeeDetailPage />,
                            handle: withPermission([
                              'erp.employees.view',
                              'erp.employees.view.own',
                            ]),
                          },
                          {
                            path: 'edit',
                            element: <LazyEmployeeEditPage />,
                            handle: withPermission('erp.employees.update'),
                          },
                        ],
                      },
                      {
                        path: 'new',
                        element: <LazyEmployeeCreatePage />,
                        handle: withPermission('erp.employees.create'),
                      },
                    ],
                  },

                  {
                    path: 'roles',
                    children: [
                      {
                        index: true,
                        element: <LazyRoleListPage />,
                        handle: withPermission('auth.roles.manage'),
                      },
                      {
                        path: 'new',
                        element: <LazyRoleCreatePage />,
                        handle: withPermission('auth.roles.manage'),
                      },
                      {
                        path: ':id',
                        children: [
                          {
                            index: true,
                            element: <LazyRoleDetailPage />,
                            handle: withPermission('auth.roles.manage'),
                          },
                          {
                            path: 'edit',
                            element: <LazyRoleEditPage />,
                            handle: withPermission('auth.roles.manage'),
                          },
                        ],
                      },
                    ],
                  },

                  { path: 'notifications', element: <LazyNotificationsPage /> },

                  {
                    path: 'plans',
                    children: [
                      {
                        index: true,
                        element: <LazyPlanListPage />,
                        handle: withPermission([
                          'planner.plan.view',
                          'planner.plan.view.own',
                        ]),
                      },
                      {
                        path: 'initiate',
                        element: <LazyInitiatePlanPage />,
                        handle: withPermission('planner.rep.plan.generate'),
                      },
                      {
                        path: 'initiate-from-deliveries',
                        element: <LazyInitiatePlanFromDeliveriesPage />,
                        handle: withPermission(
                          'planner.distributor.plan.generate',
                        ),
                      },
                      {
                        path: ':id',
                        element: <LazyPlanDetailPage />,
                        handle: withPermission([
                          'planner.plan.view',
                          'planner.plan.view.own',
                        ]),
                      },
                    ],
                  },

                  { path: '*', element: <LazyNotFoundPage minimal /> },
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
