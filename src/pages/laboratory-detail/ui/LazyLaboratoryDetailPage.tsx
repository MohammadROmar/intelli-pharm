import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const LaboratoryDetailPage = lazy(() => import('./LaboratoryDetailPage'));

export function LazyLaboratoryDetailPage() {
  return (
    <WithSuspense
      Component={LaboratoryDetailPage}
      loader={<DetailSkeleton cards={[{ rows: 3 }]} tables={1} />}
    />
  );
}
