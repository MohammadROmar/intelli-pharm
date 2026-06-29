import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const CategoryCreatePage = lazy(() => import('./CategoryCreatePage'));

export function LazyCategoryCreatePage() {
  return (
    <WithSuspense loader={<FormSkeleton cards={[{ rows: 3 }]} />}>
      <CategoryCreatePage />
    </WithSuspense>
  );
}
