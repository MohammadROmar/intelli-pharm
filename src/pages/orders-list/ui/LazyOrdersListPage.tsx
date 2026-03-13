import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const OrdersListPage = lazy(() => import('./OrdersListPage'));

export function LazyOrdersListPage() {
  return <WithSuspense Component={OrdersListPage} loader={<TableSkeleton />} />;
}
