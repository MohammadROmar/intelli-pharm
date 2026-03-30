import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const RegionCreatePage = lazy(() => import('./RegionCreatePage'));

export function LazyRegionCreatePage() {
  return (
    <WithSuspense
      Component={RegionCreatePage}
      loader={<FormSkeleton cards={[{ rows: 2 }]} />}
    />
  );
}
