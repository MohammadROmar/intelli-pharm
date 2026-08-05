import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const PharmacyCreatePage = lazy(() => import('./PharmacyCreatePage'));

function LazyPharmacyCreatePage() {
  return (
    <WithSuspense loader={<FormSkeleton cards={[{ rows: 3 }, { rows: 2 }]} />}>
      <PharmacyCreatePage />
    </WithSuspense>
  );
}

export { LazyPharmacyCreatePage as Component };
