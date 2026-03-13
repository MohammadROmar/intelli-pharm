import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const LaboratoriesPage = lazy(() => import('./LaboratoriesPage'));

export function LazyLaboratoriesPage() {
  return (
    <WithSuspense Component={LaboratoriesPage} loader={<TableSkeleton />} />
  );
}
