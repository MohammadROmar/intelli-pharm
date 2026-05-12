import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const TargetAchievementListPage = lazy(
  () => import('./TargetAchievementListPage'),
);

export function LazyTargetAchievementListPage() {
  return (
    <WithSuspense
      Component={TargetAchievementListPage}
      loader={<TableSkeleton />}
    />
  );
}
