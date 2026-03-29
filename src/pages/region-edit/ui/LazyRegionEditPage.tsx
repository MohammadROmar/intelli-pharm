import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const RegionEditPage = lazy(() => import('./RegionEditPage'));

export function LazyRegionEditPage() {
  return (
    <WithSuspense
      Component={RegionEditPage}
      loader={<FormSkeleton fields={2} />}
    />
  );
}
