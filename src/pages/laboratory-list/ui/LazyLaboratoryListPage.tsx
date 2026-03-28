import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const LaboratoryListPage = lazy(() => import('./LaboratoryListPage'));

export function LazyLaboratoryListPage() {
  return (
    <WithSuspense Component={LaboratoryListPage} loader={<TableSkeleton />} />
  );
}
