import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const RegionListPage = lazy(() => import('./RegionListPage'));

function LazyRegionListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <RegionListPage />
    </WithSuspense>
  );
}

export { LazyRegionListPage as Component };
