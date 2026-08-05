import { lazy } from 'react';

import {
  WithSuspense,
  InitiatePlanPageSkeleton,
} from '@/shared/ui/index.initial';

const InitiatePlanFromDeliveriesPage = lazy(
  () => import('./InitiatePlanFromDeliveriesPage'),
);

function LazyInitiatePlanFromDeliveriesPage() {
  return (
    <WithSuspense loader={<InitiatePlanPageSkeleton />}>
      <InitiatePlanFromDeliveriesPage />
    </WithSuspense>
  );
}

export { LazyInitiatePlanFromDeliveriesPage as Component };
