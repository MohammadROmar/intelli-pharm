import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const DeliveryListPage = lazy(() => import('./DeliveryListPage'));

function LazyDeliveryListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <DeliveryListPage />
    </WithSuspense>
  );
}

export { LazyDeliveryListPage as Component };
