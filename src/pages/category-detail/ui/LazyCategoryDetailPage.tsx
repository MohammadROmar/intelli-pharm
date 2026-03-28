import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const CategoryDetailPage = lazy(() => import('./CategoryDetailPage'));

export function LazyCategoryDetailPage() {
  return (
    <WithSuspense
      Component={CategoryDetailPage}
      loader={<DetailSkeleton rows={4} tables={1} />}
    />
  );
}
