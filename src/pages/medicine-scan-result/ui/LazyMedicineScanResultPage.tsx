import { lazy } from 'react';

import { ScanResultCardSkeleton } from './ScanResultCardSkeleton';
import { WithSuspense } from '@/shared/ui/index.initial';

const MedicineScanResultPage = lazy(() => import('./MedicineScanResultPage'));

export function LazyMedicineScanResultPage() {
  return (
    <WithSuspense
      Component={MedicineScanResultPage}
      loader={<ScanResultCardSkeleton />}
    />
  );
}
