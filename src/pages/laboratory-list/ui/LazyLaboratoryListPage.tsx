import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const LaboratoryListPage = lazy(() => import('./LaboratoryListPage'));

function LazyLaboratoryListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <LaboratoryListPage />
    </WithSuspense>
  );
}

export { LazyLaboratoryListPage as Component };
