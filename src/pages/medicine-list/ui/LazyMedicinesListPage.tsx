import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const MedicineListPage = lazy(() => import('./MedicineListPage'));

export function LazyMedicineListPage() {
  return (
    <WithSuspense Component={MedicineListPage} loader={<TableSkeleton />} />
  );
}
