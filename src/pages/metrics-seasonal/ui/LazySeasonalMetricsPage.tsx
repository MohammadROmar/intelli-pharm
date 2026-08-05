import { lazy } from 'react';

import { WithSuspense, MetricsSkeleton } from '@/shared/ui/index.initial';

const SeasonalMetricsPage = lazy(() => import('./SeasonalMetricsPage'));

function LazySeasonalMetricsPage() {
  return (
    <WithSuspense loader={<MetricsSkeleton />}>
      <SeasonalMetricsPage />
    </WithSuspense>
  );
}

export { LazySeasonalMetricsPage as Component };
