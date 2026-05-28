import { lazy } from 'react';

import { WithSuspense, MetricsSkeleton } from '@/shared/ui/index.initial';

const PharmacyMetricsPage = lazy(() => import('./PharmacyMetricsPage'));

export function LazyPharmacyMetricsPage() {
  return (
    <WithSuspense
      Component={PharmacyMetricsPage}
      loader={<MetricsSkeleton withSeason={false} />}
    />
  );
}
