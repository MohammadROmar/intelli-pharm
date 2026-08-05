import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const PharmacyEditPage = lazy(() => import('./PharmacyEditPage'));

function LazyPharmacyEditPage() {
  return (
    <WithSuspense loader={<FormSkeleton cards={[{ rows: 3 }, { rows: 2 }]} />}>
      <PharmacyEditPage />
    </WithSuspense>
  );
}

export { LazyPharmacyEditPage as Component };
