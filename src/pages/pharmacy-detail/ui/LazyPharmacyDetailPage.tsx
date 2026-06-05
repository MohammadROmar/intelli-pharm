import { lazy } from 'react';

import { WithSuspense, DetailSkeleton } from '@/shared/ui/index.initial';

const PharmacyDetailPage = lazy(() => import('./PharmacyDetailPage'));

export function LazyPharmacyDetailPage() {
  return (
    <WithSuspense
      Component={PharmacyDetailPage}
      loader={
        <DetailSkeleton
          cards={[{ rows: 2 }, { rows: 2 }, { rows: 1 }, { rows: 1 }]}
          tables={0}
        />
      }
    />
  );
}
