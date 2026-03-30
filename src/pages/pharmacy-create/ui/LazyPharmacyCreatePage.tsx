import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const PharmacyCreatePage = lazy(() => import('./PharmacyCreatePage'));

export function LazyPharmacyCreatePage() {
  return (
    <WithSuspense
      Component={PharmacyCreatePage}
      loader={<FormSkeleton cards={[{ rows: 3 }, { rows: 2 }]} />}
    />
  );
}
