import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const MedicineEditPage = lazy(() => import('./MedicineEditPage'));

function LazyMedicineEditPage() {
  return (
    <WithSuspense loader={<FormSkeleton cards={[{ rows: 7 }, { rows: 2 }]} />}>
      <MedicineEditPage />
    </WithSuspense>
  );
}

export { LazyMedicineEditPage as Component };
