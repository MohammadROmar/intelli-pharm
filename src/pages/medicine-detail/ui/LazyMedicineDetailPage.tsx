import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const MedicineDetailPage = lazy(() => import('./MedicineDetailPage'));

export function LazyMedicineDetailPage() {
  return (
    <WithSuspense
      Component={MedicineDetailPage}
      loader={<DetailSkeleton cards={[{ rows: 4 }]} tables={3} hasImage />}
    />
  );
}
