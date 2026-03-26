import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const LaboratoriesPage = lazy(() => import('./LaboratoriesListPage'));

export function LazyLaboratoriesListPage() {
  return (
    <WithSuspense Component={LaboratoriesPage} loader={<TableSkeleton />} />
  );
}
