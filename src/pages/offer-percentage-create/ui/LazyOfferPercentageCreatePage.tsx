import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const OfferPercentageCreatePage = lazy(
  () => import('./OfferPercentageCreatePage'),
);

export function LazyOfferPercentageCreatePage() {
  return (
    <WithSuspense
      Component={OfferPercentageCreatePage}
      loader={<FormSkeleton cards={[{ rows: 3 }]} />}
    />
  );
}
