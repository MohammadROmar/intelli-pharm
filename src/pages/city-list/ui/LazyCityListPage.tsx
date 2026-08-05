import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const CityListPage = lazy(() => import('./CityListPage'));

function LazyCityListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <CityListPage />
    </WithSuspense>
  );
}

export { LazyCityListPage as Component };
