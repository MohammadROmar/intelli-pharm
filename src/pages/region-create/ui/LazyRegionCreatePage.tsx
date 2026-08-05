import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const RegionCreatePage = lazy(() => import('./RegionCreatePage'));

function LazyRegionCreatePage() {
  return (
    <WithSuspense loader={<FormSkeleton cards={[{ rows: 3 }]} />}>
      <RegionCreatePage />
    </WithSuspense>
  );
}

export { LazyRegionCreatePage as Component };
