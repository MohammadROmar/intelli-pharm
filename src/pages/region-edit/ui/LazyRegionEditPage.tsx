import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const RegionEditPage = lazy(() => import('./RegionEditPage'));

export function LazyRegionEditPage() {
  return (
    <WithSuspense loader={<FormSkeleton cards={[{ rows: 2 }]} />}>
      <RegionEditPage />
    </WithSuspense>
  );
}
