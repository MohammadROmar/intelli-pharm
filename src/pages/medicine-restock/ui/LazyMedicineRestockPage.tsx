import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const MedicineRestockPage = lazy(() => import('./MedicineRestockPage'));

export function LazyMedicineRestockPage() {
  return (
    <WithSuspense
      Component={MedicineRestockPage}
      loader={<FormSkeleton cards={[{ rows: 3 }]} />}
    />
  );
}
