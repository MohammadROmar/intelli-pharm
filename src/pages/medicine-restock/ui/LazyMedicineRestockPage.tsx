import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const MedicineRestockPage = lazy(() => import('./MedicineRestockPage'));

function LazyMedicineRestockPage() {
  return (
    <WithSuspense loader={<FormSkeleton cards={[{ rows: 3 }]} />}>
      <MedicineRestockPage />
    </WithSuspense>
  );
}

export { LazyMedicineRestockPage as Component };
