import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const OfferDetailPage = lazy(() => import('./OfferDetailPage'));

function LazyOfferDetailPage() {
  return (
    <WithSuspense loader={<DetailSkeleton cards={[{ rows: 4 }]} tables={0} />}>
      <OfferDetailPage />
    </WithSuspense>
  );
}

export { LazyOfferDetailPage as Component };
