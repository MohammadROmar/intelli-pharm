import { lazy } from 'react';

import { TableSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const PlanListPage = lazy(() => import('./PlanListPage'));

export function LazyPlanListPage() {
  return <WithSuspense Component={PlanListPage} loader={<TableSkeleton />} />;
}
