import { lazy } from 'react';

import { ScanPageSkeleton } from './ScanPageSkeleton';
import { WithSuspense } from '@/shared/ui/index.initial';

const MedicineScanPage = lazy(() => import('./MedicineScanPage'));

function LazyMedicineScanPage() {
  return (
    <WithSuspense loader={<ScanPageSkeleton />}>
      <MedicineScanPage />
    </WithSuspense>
  );
}

export { LazyMedicineScanPage as Component };
