import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui';

const CategoryCreatePage = lazy(() => import('./CategoryCreatePage'));

export function CategoryCreatePageLazy() {
  return (
    <WithSuspense
      Component={CategoryCreatePage}
      loader={<FormSkeleton fields={2} />}
    />
  );
}
