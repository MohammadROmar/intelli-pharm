import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui';

const EmployeeListPage = lazy(() => import('./EmployeeListPage'));

export function LazyEmployeeListPage() {
  return (
    <WithSuspense Component={EmployeeListPage} loader={<TableSkeleton />} />
  );
}
