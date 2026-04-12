import { lazy } from 'react';

import { MetricsSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const MetricsMedicinePage = lazy(() => import('./MetricsMedicinePage'));

export function LazyMetricsMedicinePage() {
  return (
    <WithSuspense
      Component={MetricsMedicinePage}
      loader={<MetricsSkeleton />}
    />
  );
}
