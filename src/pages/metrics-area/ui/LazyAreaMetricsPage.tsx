import { lazy } from 'react';

import { WithSuspense, MetricsSkeleton } from '@/shared/ui/index.initial';

const AreaMetricsPage = lazy(() => import('./AreaMetricsPage'));

function LazyAreaMetricsPage() {
  return (
    <WithSuspense loader={<MetricsSkeleton />}>
      <AreaMetricsPage />
    </WithSuspense>
  );
}

export { LazyAreaMetricsPage as Component };
