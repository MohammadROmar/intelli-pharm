import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const RegionDetailPage = lazy(() => import('./RegionDetailPage'));

export function LazyRegionDetailPage() {
  return (
    <WithSuspense
      Component={RegionDetailPage}
      loader={<DetailSkeleton rows={1} tables={1} />}
    />
  );
}
