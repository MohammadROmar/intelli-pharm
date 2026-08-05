import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { ChatRoute } from '../config/ChatRoute';
import { PublicRoute } from '../config/PublicRoute';
import { ProtectedRoute } from '../config/ProtectedRoute';
import { DashboardRoute } from '../config/DashboardRoute';

import { LazyRootLayout } from '../../../layouts/LazyRootLayout';

import type { ScrollRestorationHandle } from '@/shared/lib';

import { LazyErrorPage } from '@/pages/error';
import { LazyNotFoundPage } from '@/pages/not-found';

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
            lazy: () => import('@/pages/login'),
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
                lazy: () => import('../config/PermissionRoute'),
                children: [
                  {
                    index: true,
                    lazy: () => import('../config/DashboardLandingRoute'),
                  },

                  {
                    path: 'overview',
                    lazy: () => import('@/pages/dashboard-overview'),
                    handle: withPermission('dashboard.overview'),
                  },

                  {
                    path: 'tracking',
                    lazy: () => import('@/pages/live-tracking'),
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
                        lazy: () => import('@/pages/order-list'),
                        handle: withPermission([
                          'erp.orders.view',
                          'erp.orders.view.own',
                        ]),
                      },
                      {
                        path: ':id',
                        lazy: () => import('@/pages/order-detail'),
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
                        lazy: () => import('@/pages/laboratory-list'),
                        handle: withPermission('erp.laboratories.view'),
                      },
                      {
                        path: ':id',
                        lazy: () => import('@/pages/laboratory-detail'),
                        handle: withPermission('erp.laboratories.view'),
                      },
                    ],
                  },

                  {
                    path: 'cities',
                    lazy: () => import('@/pages/city-list'),
                    handle: withPermission('erp.cities.view'),
                  },

                  {
                    path: 'metrics',
                    children: [
                      { index: true, element: <LazyNotFoundPage minimal /> },
                      {
                        path: 'seasonal',
                        lazy: () => import('@/pages/metrics-seasonal'),
                        handle: withPermission('crm.analytics.view'),
                      },
                      {
                        path: 'medicine',
                        lazy: () => import('@/pages/metrics-medicine'),
                        handle: withPermission('crm.analytics.view'),
                      },
                      {
                        path: 'area',
                        lazy: () => import('@/pages/metrics-area'),
                        handle: withPermission('crm.analytics.view'),
                      },
                      {
                        path: 'pharmacy',
                        lazy: () => import('@/pages/metrics-pharmacy'),
                        handle: withPermission('crm.analytics.view'),
                      },
                    ],
                  },

                  {
                    path: 'deliveries',
                    children: [
                      {
                        index: true,
                        lazy: () => import('@/pages/delivery-list'),
                        handle: withPermission('planner.deliveries.view_all'),
                      },
                      {
                        path: ':id',
                        lazy: () => import('@/pages/delivery-detail'),
                        handle: withPermission('planner.deliveries.view_all'),
                      },
                      {
                        path: 'assign',
                        lazy: () => import('@/pages/delivery-assign'),
                        handle: withPermission('erp.orders.assign_distributor'),
                      },
                    ],
                  },

                  {
                    path: 'regions',
                    children: [
                      {
                        index: true,
                        lazy: () => import('@/pages/region-list'),
                        handle: withPermission('erp.regions.view'),
                      },
                      {
                        path: 'new',
                        lazy: () => import('@/pages/region-create'),
                        handle: withPermission('erp.regions.create'),
                      },
                      {
                        path: ':id',
                        children: [
                          {
                            index: true,
                            lazy: () => import('@/pages/region-detail'),
                            handle: withPermission('erp.regions.view'),
                          },
                          {
                            path: 'edit',
                            lazy: () => import('@/pages/region-edit'),
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
                        lazy: () => import('@/pages/pharmacy-list'),
                        handle: withPermission('erp.pharmacies.view'),
                      },
                      {
                        path: 'new',
                        lazy: () => import('@/pages/pharmacy-create'),
                        handle: withPermission('erp.pharmacies.create'),
                      },
                      {
                        path: ':id',
                        children: [
                          {
                            index: true,
                            lazy: () => import('@/pages/pharmacy-detail'),
                            handle: withPermission('erp.pharmacies.view'),
                          },
                          {
                            path: 'edit',
                            lazy: () => import('@/pages/pharmacy-edit'),
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
                        lazy: () => import('@/pages/medicine-list'),
                        handle: withPermission('erp.medicines.view'),
                      },
                      {
                        path: 'new',
                        lazy: () => import('@/pages/medicine-create'),
                        handle: withPermission('erp.medicines.create'),
                      },
                      {
                        path: ':id',
                        children: [
                          {
                            index: true,
                            lazy: () => import('@/pages/medicine-detail'),
                            handle: withPermission('erp.medicines.view'),
                          },
                          {
                            path: 'edit',
                            lazy: () => import('@/pages/medicine-edit'),
                            handle: withPermission('erp.medicines.update'),
                          },
                          {
                            path: 'restock',
                            lazy: () => import('@/pages/medicine-restock'),
                            handle: withPermission('erp.stock.update'),
                          },
                        ],
                      },
                      {
                        path: 'scan',
                        children: [
                          {
                            index: true,
                            lazy: () => import('@/pages/medicine-scan'),
                            handle: withPermission('erp.medicines.view'),
                          },
                          {
                            path: ':barcode',
                            lazy: () => import('@/pages/medicine-scan-result'),
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
                        lazy: () => import('@/pages/gift-list'),
                        handle: withPermission('erp.gifts.view'),
                      },
                      {
                        path: ':id',
                        lazy: () => import('@/pages/gift-detail'),
                        handle: withPermission('erp.gifts.view'),
                      },
                    ],
                  },

                  {
                    path: 'promotions/offers',
                    children: [
                      {
                        index: true,
                        lazy: () => import('@/pages/offer-list'),
                        handle: withPermission('erp.offers.view'),
                      },
                      {
                        path: ':id',
                        lazy: () => import('@/pages/offer-detail'),
                        handle: withPermission('erp.offers.view'),
                      },
                      {
                        path: 'new-percentage',
                        lazy: () => import('@/pages/offer-percentage-create'),
                        handle: withPermission('erp.offers.create'),
                      },
                      {
                        path: 'new-gifts',
                        lazy: () => import('@/pages/offer-gift-create'),
                        handle: withPermission('erp.offers.create'),
                      },
                    ],
                  },

                  {
                    path: 'categories',
                    children: [
                      {
                        index: true,
                        lazy: () => import('@/pages/category-list'),
                        handle: withPermission('erp.categories.view'),
                      },
                      {
                        path: ':id',
                        children: [
                          {
                            index: true,
                            lazy: () => import('@/pages/category-detail'),
                            handle: withPermission('erp.categories.view'),
                          },
                          {
                            path: 'edit',
                            lazy: () => import('@/pages/category-edit'),
                            handle: withPermission('erp.categories.update'),
                          },
                        ],
                      },
                      {
                        path: 'new',
                        lazy: () => import('@/pages/category-create'),
                        handle: withPermission('erp.categories.create'),
                      },
                    ],
                  },

                  {
                    path: 'targets',
                    children: [
                      {
                        index: true,
                        lazy: () => import('@/pages/target-list'),
                        handle: withPermission('erp.targets.view'),
                      },
                      {
                        path: ':id',
                        children: [
                          {
                            index: true,
                            lazy: () => import('@/pages/target-detail'),
                            handle: withPermission('erp.targets.view'),
                          },
                          {
                            path: 'achievements',
                            lazy: () => import('@/pages/target-achievement'),
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
                        lazy: () => import('@/pages/employee-list'),
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
                            lazy: () => import('@/pages/employee-detail'),
                            handle: withPermission([
                              'erp.employees.view',
                              'erp.employees.view.own',
                            ]),
                          },
                          {
                            path: 'edit',
                            lazy: () => import('@/pages/employee-edit'),
                            handle: withPermission('erp.employees.update'),
                          },
                        ],
                      },
                      {
                        path: 'new',
                        lazy: () => import('@/pages/employee-create'),
                        handle: withPermission('erp.employees.create'),
                      },
                    ],
                  },

                  {
                    path: 'roles',
                    children: [
                      {
                        index: true,
                        lazy: () => import('@/pages/role-list'),
                        handle: withPermission('auth.roles.manage'),
                      },
                      {
                        path: 'new',
                        lazy: () => import('@/pages/role-create'),
                        handle: withPermission('auth.roles.manage'),
                      },
                      {
                        path: ':id',
                        children: [
                          {
                            index: true,
                            lazy: () => import('@/pages/role-detail'),
                            handle: withPermission('auth.roles.manage'),
                          },
                          {
                            path: 'edit',
                            lazy: () => import('@/pages/role-edit'),
                            handle: withPermission('auth.roles.manage'),
                          },
                        ],
                      },
                    ],
                  },

                  {
                    path: 'notifications',
                    lazy: () => import('@/pages/notifications'),
                  },

                  {
                    path: 'plans',
                    children: [
                      {
                        index: true,
                        lazy: () => import('@/pages/plan-list'),
                        handle: withPermission([
                          'planner.plan.view',
                          'planner.plan.view.own',
                        ]),
                      },
                      {
                        path: 'initiate',
                        lazy: () => import('@/pages/plan-initiate'),
                        handle: withPermission('planner.rep.plan.generate'),
                      },
                      {
                        path: 'initiate-from-deliveries',
                        lazy: () =>
                          import('@/pages/plan-initiate-from-deliveries'),
                        handle: withPermission(
                          'planner.distributor.plan.generate',
                        ),
                      },
                      {
                        path: ':id',
                        lazy: () => import('@/pages/plan-detail'),
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
            children: [{ index: true, lazy: () => import('@/pages/ai-chat') }],
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
