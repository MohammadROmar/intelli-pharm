import { lazy } from 'react';

import { WithSuspense, DetailSkeleton } from '@/shared/ui/index.initial';

const PharmacyDetailPage = lazy(() => import('./PharmacyDetailPage'));

export function LazyPharmacyDetailPage() {
  return (
    <WithSuspense
      Component={PharmacyDetailPage}
      loader={<DetailSkeleton cards={[{ rows: 2 }, { rows: 3 }]} tables={0} />}
    />
  );
}
