import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const RegionEditPage = lazy(() => import('./RegionEditPage'));

function LazyRegionEditPage() {
  return (
    <WithSuspense loader={<FormSkeleton cards={[{ rows: 2 }]} />}>
      <RegionEditPage />
    </WithSuspense>
  );
}

export { LazyRegionEditPage as Component };
