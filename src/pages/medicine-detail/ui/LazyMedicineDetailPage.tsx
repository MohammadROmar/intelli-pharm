import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const MedicineDetailPage = lazy(() => import('./MedicineDetailPage'));

function LazyMedicineDetailPage() {
  return (
    <WithSuspense
      loader={<DetailSkeleton cards={[{ rows: 4 }]} tables={3} hasImage />}
    >
      <MedicineDetailPage />
    </WithSuspense>
  );
}

export { LazyMedicineDetailPage as Component };
