import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const EmployeeListPage = lazy(() => import('./EmployeeListPage'));

function LazyEmployeeListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <EmployeeListPage />
    </WithSuspense>
  );
}

export { LazyEmployeeListPage as Component };
