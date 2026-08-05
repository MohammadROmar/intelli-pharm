import { lazy } from 'react';

import { TableSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const PlanListPage = lazy(() => import('./PlanListPage'));

function LazyPlanListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <PlanListPage />
    </WithSuspense>
  );
}

export { LazyPlanListPage as Component };
