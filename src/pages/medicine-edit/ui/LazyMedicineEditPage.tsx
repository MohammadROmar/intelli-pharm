import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const MedicineEditPage = lazy(() => import('./MedicineEditPage'));

export function LazyMedicineEditPage() {
  return (
    <WithSuspense
      Component={MedicineEditPage}
      loader={<FormSkeleton fields={4} />}
    />
  );
}
