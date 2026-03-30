import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const PharmacyEditPage = lazy(() => import('./PharmacyEditPage'));

export function LazyPharmacyEditPage() {
  return (
    <WithSuspense
      Component={PharmacyEditPage}
      loader={<FormSkeleton cards={[{ rows: 3 }, { rows: 2 }]} />}
    />
  );
}
