import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const OfferDetailPage = lazy(() => import('./OfferDetailPage'));

export function LazyOfferDetailPage() {
  return (
    <WithSuspense
      Component={OfferDetailPage}
      loader={<DetailSkeleton cards={[{ rows: 4 }]} tables={0} />}
    />
  );
}
