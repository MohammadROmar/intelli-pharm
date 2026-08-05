import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const TargetDetailPage = lazy(() => import('./TargetDetailPage'));

function LazyTargetDetailPage() {
  return (
    <WithSuspense loader={<DetailSkeleton cards={[{ rows: 4 }]} tables={0} />}>
      <TargetDetailPage />
    </WithSuspense>
  );
}

export { LazyTargetDetailPage as Component };
