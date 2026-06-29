import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const DeliveryListPage = lazy(() => import('./DeliveryListPage'));

export function LazyDeliveryListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <DeliveryListPage />
    </WithSuspense>
  );
}
