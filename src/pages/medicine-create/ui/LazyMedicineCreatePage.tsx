import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const MedicineCreatePage = lazy(() => import('./MedicineCreatePage'));

export function LazyMedicineCreatePage() {
  return (
    <WithSuspense
      Component={MedicineCreatePage}
      loader={<FormSkeleton cards={[{ rows: 6 }, { rows: 2 }, { rows: 1 }]} />}
    />
  );
}
