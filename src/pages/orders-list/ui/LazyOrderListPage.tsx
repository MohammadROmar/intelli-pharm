import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const OrderListPage = lazy(() => import('./OrderListPage'));

export function LazyOrderListPage() {
  return <WithSuspense Component={OrderListPage} loader={<TableSkeleton />} />;
}
