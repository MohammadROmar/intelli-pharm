import { lazy } from 'react';

import { WithSuspense, MetricsSkeleton } from '@/shared/ui/index.initial';

const AreaMetricsPage = lazy(() => import('./AreaMetricsPage'));

export function LazyAreaMetricsPage() {
  return (
    <WithSuspense Component={AreaMetricsPage} loader={<MetricsSkeleton />} />
  );
}
