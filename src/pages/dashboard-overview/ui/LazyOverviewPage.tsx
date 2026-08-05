import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';

import { OverviewSkeleton } from './OverviewSkeleton';

const OverviewPage = lazy(() =>
  import('./OverviewPage').then((module) => ({
    default: module.OverviewPage,
  })),
);

function LazyOverviewPage() {
  return (
    <WithSuspense loader={<OverviewSkeleton />}>
      <OverviewPage />
    </WithSuspense>
  );
}

export { LazyOverviewPage as Component };
