import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui/index.initial';

const CategoryListPage = lazy(() => import('./CategoryListPage'));

function LazyCategoryListPage() {
  return (
    <WithSuspense loader={<TableSkeleton />}>
      <CategoryListPage />
    </WithSuspense>
  );
}

export { LazyCategoryListPage as Component };
