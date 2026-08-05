import { lazy } from 'react';

import { DetailSkeleton, WithSuspense } from '@/shared/ui/index.initial';

const LaboratoryDetailPage = lazy(() => import('./LaboratoryDetailPage'));

function LazyLaboratoryDetailPage() {
  return (
    <WithSuspense loader={<DetailSkeleton cards={[{ rows: 3 }]} tables={1} />}>
      <LaboratoryDetailPage />
    </WithSuspense>
  );
}

export { LazyLaboratoryDetailPage as Component };
