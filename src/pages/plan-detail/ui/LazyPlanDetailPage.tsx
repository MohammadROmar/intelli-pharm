import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const PlanDetailPage = lazy(() => import('./PlanDetailPage'));

export function LazyPlanDetailPage() {
  return (
    <WithSuspense
      Component={PlanDetailPage}
      loader={
        <DetailSkeleton
          tables={0}
          cards={[{ rows: 2 }, { rows: 3 }, { rows: 2 }]}
        />
      }
    />
  );
}
