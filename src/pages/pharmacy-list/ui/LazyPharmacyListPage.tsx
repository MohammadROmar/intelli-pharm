import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const PharmacyListPage = lazy(() => import('./PharmacyListPage'));

function LazyPharmacyListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <PharmacyListPage />
    </WithSuspense>
  );
}

export { LazyPharmacyListPage as Component };
