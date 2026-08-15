import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';

import { OrderDetailSkeleton } from './OrderDetailSkeleton';

const OrderDetailPage = lazy(() => import('./OrderDetailPage'));

function LazyOrderDetailPage() {
  return (
    <WithSuspense loader={<OrderDetailSkeleton />}>
      <OrderDetailPage />
    </WithSuspense>
  );
}

export { LazyOrderDetailPage as Component };
