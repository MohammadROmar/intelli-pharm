import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const DeliveryDetailPage = lazy(() => import('./DeliveryDetailPage'));

function LazyDeliveryDetailPage() {
  return (
    <WithSuspense loader={<DetailSkeleton cards={[{ rows: 4 }]} tables={1} />}>
      <DeliveryDetailPage />
    </WithSuspense>
  );
}

export { LazyDeliveryDetailPage as Component };
