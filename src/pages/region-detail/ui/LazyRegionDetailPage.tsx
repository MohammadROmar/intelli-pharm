import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const RegionDetailPage = lazy(() => import('./RegionDetailPage'));

function LazyRegionDetailPage() {
  return (
    <WithSuspense loader={<DetailSkeleton cards={[{ rows: 1 }]} tables={1} />}>
      <RegionDetailPage />
    </WithSuspense>
  );
}

export { LazyRegionDetailPage as Component };
