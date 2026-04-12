import { lazy, Suspense } from 'react';

import { MedicineMetricsCards } from './MedicineMetricsCards';
import { MedicineMetricsHeader } from './MedicineMetricsHeader';
import { useGetMedicineMetrics } from '../model/useGetMedicineMetrics';
import { QueryError, MetricsSkeleton, Skeleton } from '@/shared/ui';
import { DetailedBreakdownTable } from './DetailedBreakdownTable';

const MedicineCharts = lazy(() => import('./MedicineCharts'));

function Loader() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Skeleton className="h-94 w-full" />
      <Skeleton className="h-94 w-full" />
    </div>
  );
}

export default function MetricsMedicinePage() {
  const { data, isLoading, isError, error, refetch } = useGetMedicineMetrics();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <MetricsSkeleton charts={2} />;
  }

  const metrics = data.data!;

  return (
    <>
      <MedicineMetricsHeader />
      <MedicineMetricsCards metrics={metrics} />
      <Suspense fallback={<Loader />}>
        <MedicineCharts metrics={metrics} />
      </Suspense>
      <DetailedBreakdownTable metrics={metrics} />
    </>
  );
}
