import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const CategoryDetailPage = lazy(() => import('./CategoryDetailPage'));

function LazyCategoryDetailPage() {
  return (
    <WithSuspense loader={<DetailSkeleton cards={[{ rows: 4 }]} tables={1} />}>
      <CategoryDetailPage />
    </WithSuspense>
  );
}

export { LazyCategoryDetailPage as Component };
