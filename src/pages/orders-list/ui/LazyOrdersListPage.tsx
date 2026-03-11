import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui';

const OrdersListPage = lazy(() => import('./OrdersListPage'));

export function LazyOrdersListPage() {
  return <WithSuspense Component={OrdersListPage} loader={<TableSkeleton />} />;
}
