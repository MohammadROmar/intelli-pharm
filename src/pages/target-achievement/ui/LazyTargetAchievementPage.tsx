import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const TargetAchievementListPage = lazy(
  () => import('./TargetAchievementListPage'),
);

function LazyTargetAchievementListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <TargetAchievementListPage />
    </WithSuspense>
  );
}

export { LazyTargetAchievementListPage as Component };
