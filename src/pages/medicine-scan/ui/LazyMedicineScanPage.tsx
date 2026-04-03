import { lazy } from 'react';

import { WithSuspense, FormSkeleton } from '@/shared/ui/index.initial';

const MedicineScanPage = lazy(() => import('./MedicineScanPage'));

export function LazyMedicineScanPage() {
  return (
    <WithSuspense
      Component={MedicineScanPage}
      loader={<FormSkeleton cards={[{ rows: 2 }]} />}
    />
  );
}
