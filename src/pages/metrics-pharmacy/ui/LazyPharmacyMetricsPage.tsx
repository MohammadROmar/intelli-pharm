import { lazy } from 'react';

import { WithSuspense, MetricsSkeleton } from '@/shared/ui/index.initial';

const PharmacyMetricsPage = lazy(() => import('./PharmacyMetricsPage'));

function LazyPharmacyMetricsPage() {
  return (
    <WithSuspense loader={<MetricsSkeleton withSeason={false} />}>
      <PharmacyMetricsPage />
    </WithSuspense>
  );
}

export { LazyPharmacyMetricsPage as Component };
