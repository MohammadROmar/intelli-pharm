import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';
import { TargetListSkeleton } from './TargetListSkeleton';

const TargetListPage = lazy(() => import('./TargetListPage'));

function LazyTargetListPage() {
  return (
    <WithSuspense loader={<TargetListSkeleton />}>
      <TargetListPage />
    </WithSuspense>
  );
}

export { LazyTargetListPage as Component };
