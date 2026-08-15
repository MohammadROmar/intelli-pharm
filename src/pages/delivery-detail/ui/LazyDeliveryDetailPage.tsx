import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';

import { DeliveryDetailSkeleton } from './DeliveryDetailSkeleton';

const DeliveryDetailPage = lazy(() => import('./DeliveryDetailPage'));

function LazyDeliveryDetailPage() {
  return (
    <WithSuspense loader={<DeliveryDetailSkeleton />}>
      <DeliveryDetailPage />
    </WithSuspense>
  );
}

export { LazyDeliveryDetailPage as Component };
