import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';
import { TargetListSkeleton } from './TargetListSkeleton';

const TargetListPage = lazy(() => import('./TargetListPage'));

export function LazyTargetListPage() {
  return (
    <WithSuspense Component={TargetListPage} loader={<TargetListSkeleton />} />
  );
}
