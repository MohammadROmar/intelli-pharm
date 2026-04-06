import { lazy } from 'react';

import { MetricsPharmacySkeleton } from './MetricsPharmacySkeleton';
import { WithSuspense } from '@/shared/ui/index.initial';

const MetricsPharmacyPage = lazy(() => import('./MetricsPharmacyPage'));

export function LazyMetricsPharmacyPage() {
  return (
    <WithSuspense
      Component={MetricsPharmacyPage}
      loader={<MetricsPharmacySkeleton />}
    />
  );
}
