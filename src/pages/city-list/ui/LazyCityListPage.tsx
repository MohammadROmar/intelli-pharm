import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const CityListPage = lazy(() => import('./CityListPage'));

export function LazyCityListPage() {
  return <WithSuspense Component={CityListPage} loader={<TableSkeleton />} />;
}
