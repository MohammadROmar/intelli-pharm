import { lazy } from 'react';

import { ScanResultCardSkeleton } from './ScanResultCardSkeleton';
import { WithSuspense } from '@/shared/ui/index.initial';

const MedicineScanResultPage = lazy(() => import('./MedicineScanResultPage'));

function LazyMedicineScanResultPage() {
  return (
    <WithSuspense loader={<ScanResultCardSkeleton />}>
      <MedicineScanResultPage />
    </WithSuspense>
  );
}

export { LazyMedicineScanResultPage as Component };
