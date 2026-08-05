import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const RoleListPage = lazy(() => import('./RoleListPage'));

function LazyRoleListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <RoleListPage />
    </WithSuspense>
  );
}

export { LazyRoleListPage as Component };
