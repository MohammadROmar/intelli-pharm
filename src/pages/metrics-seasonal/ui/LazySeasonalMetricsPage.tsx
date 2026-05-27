import { lazy } from 'react';

import { WithSuspense, MetricsSkeleton } from '@/shared/ui/index.initial';

const SeasonalMetricsPage = lazy(() => import('./SeasonalMetricsPage'));

export function LazySeasonalMetricsPage() {
  return (
    <WithSuspense
      Component={SeasonalMetricsPage}
      loader={<MetricsSkeleton />}
    />
  );
}
