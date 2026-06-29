import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const CategoryEditPage = lazy(() => import('./CategoryEditPage'));

export function LazyCategoryEditPage() {
  return (
    <WithSuspense loader={<FormSkeleton cards={[{ rows: 3 }]} />}>
      <CategoryEditPage />
    </WithSuspense>
  );
}
