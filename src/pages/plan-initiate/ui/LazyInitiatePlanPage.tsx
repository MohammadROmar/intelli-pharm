import { lazy } from 'react';

import {
  WithSuspense,
  InitiatePlanPageSkeleton,
} from '@/shared/ui/index.initial';

const InitiatePlanPage = lazy(() => import('./InitiatePlanPage'));

function LazyInitiatePlanPage() {
  return (
    <WithSuspense loader={<InitiatePlanPageSkeleton />}>
      <InitiatePlanPage />
    </WithSuspense>
  );
}

export { LazyInitiatePlanPage as Component };
