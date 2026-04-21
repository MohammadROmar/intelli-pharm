import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const DeliveryDetailPage = lazy(() => import('./DeliveryDetailPage'));

export function LazyDeliveryDetailPage() {
  return (
    <WithSuspense
      Component={DeliveryDetailPage}
      loader={<DetailSkeleton cards={[{ rows: 4 }]} tables={1} />}
    />
  );
}
