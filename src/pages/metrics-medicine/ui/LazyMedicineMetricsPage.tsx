import { lazy } from 'react';

import { WithSuspense, MetricsSkeleton } from '@/shared/ui/index.initial';

const MedicineMetricsPage = lazy(() => import('./MedicineMetricsPage'));

export function LazyMedicineMetricsPage() {
  return (
    <WithSuspense loader={<MetricsSkeleton />}>
      <MedicineMetricsPage />
    </WithSuspense>
  );
}
