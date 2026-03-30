import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const MedicineDetailsPage = lazy(() => import('./MedicineDetailPage'));

export function LazyMedicineDetailsPage() {
  return (
    <WithSuspense
      Component={MedicineDetailsPage}
      loader={<DetailSkeleton cards={[{ rows: 4 }]} tables={3} hasImage />}
    />
  );
}
