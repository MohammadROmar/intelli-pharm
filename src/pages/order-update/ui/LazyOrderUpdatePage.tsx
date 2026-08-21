import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';

import { OrderUpdatePageSkeleton } from './OrderUpdatePageSkeleton';

const OrderUpdatePage = lazy(() => import('./OrderUpdatePage'));

function LazyOrderUpdatePage() {
  return (
    <WithSuspense loader={<OrderUpdatePageSkeleton />}>
      <OrderUpdatePage />
    </WithSuspense>
  );
}

export { LazyOrderUpdatePage as Component };
