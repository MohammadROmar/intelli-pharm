import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const MedicineListPage = lazy(() => import('./MedicineListPage'));

function LazyMedicineListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <MedicineListPage />
    </WithSuspense>
  );
}

export { LazyMedicineListPage as Component };
