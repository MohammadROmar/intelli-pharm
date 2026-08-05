import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const MedicineCreatePage = lazy(() => import('./MedicineCreatePage'));

function LazyMedicineCreatePage() {
  return (
    <WithSuspense
      loader={<FormSkeleton cards={[{ rows: 7 }, { rows: 2 }, { rows: 1 }]} />}
    >
      <MedicineCreatePage />
    </WithSuspense>
  );
}

export { LazyMedicineCreatePage as Component };
