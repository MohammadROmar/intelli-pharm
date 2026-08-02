import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const RoleListPage = lazy(() => import('./RoleListPage'));

export function LazyRoleListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <RoleListPage />
    </WithSuspense>
  );
}
