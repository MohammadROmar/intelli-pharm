import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';
import { MedicineDetailSkeleton } from './MedicineDetailSkeleton';

const MedicineDetailsPage = lazy(() => import('./MedicineDetailPage'));

export function LazyMedicineDetailsPage() {
  return (
    <WithSuspense
      Component={MedicineDetailsPage}
      loader={<MedicineDetailSkeleton />}
    />
  );
}
