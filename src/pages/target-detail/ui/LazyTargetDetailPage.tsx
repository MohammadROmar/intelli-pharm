import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const TargetDetailPage = lazy(() => import('./TargetDetailPage'));

export function LazyTargetDetailPage() {
  return (
    <WithSuspense
      Component={TargetDetailPage}
      loader={<DetailSkeleton cards={[{ rows: 4 }]} tables={0} />}
    />
  );
}
