import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const CategoryEditPage = lazy(() => import('./CategoryEditPage'));

export function LazyCategoryEditPage() {
  return (
    <WithSuspense
      Component={CategoryEditPage}
      loader={<FormSkeleton cards={[{ rows: 3 }]} />}
    />
  );
}
