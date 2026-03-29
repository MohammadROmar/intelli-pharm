import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const RegionListPage = lazy(() => import('./RegionListPage'));

export function LazyRegionListPage() {
  return <WithSuspense Component={RegionListPage} loader={<TableSkeleton />} />;
}
