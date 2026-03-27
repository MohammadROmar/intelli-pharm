import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const CityPage = lazy(() => import('./CityListPage'));

export function LazyCityListPage() {
  return <WithSuspense Component={CityPage} loader={<TableSkeleton />} />;
}
