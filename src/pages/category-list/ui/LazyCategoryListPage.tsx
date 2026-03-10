import { lazy } from 'react';

import { WithSuspense, TableSkeleton } from '@/shared/ui';

const CategoryListPage = lazy(() => import('./CategoryListPage'));

export function LazyCategoryListPage() {
  return (
    <WithSuspense Component={CategoryListPage} loader={<TableSkeleton />} />
  );
}
