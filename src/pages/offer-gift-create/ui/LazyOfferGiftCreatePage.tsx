import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const OfferGiftCreatePage = lazy(() => import('./OfferGiftCreatePage'));

export function LazyOfferGiftCreatePage() {
  return (
    <WithSuspense loader={<FormSkeleton cards={[{ rows: 4 }]} />}>
      <OfferGiftCreatePage />
    </WithSuspense>
  );
}
