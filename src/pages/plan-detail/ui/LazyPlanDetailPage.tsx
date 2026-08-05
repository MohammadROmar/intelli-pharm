import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const PlanDetailPage = lazy(() => import('./PlanDetailPage'));

function LazyPlanDetailPage() {
  return (
    <WithSuspense
      loader={
        <DetailSkeleton
          tables={0}
          cards={[{ rows: 2 }, { rows: 3 }, { rows: 2 }]}
        />
      }
    >
      <PlanDetailPage />
    </WithSuspense>
  );
}

export { LazyPlanDetailPage as Component };
