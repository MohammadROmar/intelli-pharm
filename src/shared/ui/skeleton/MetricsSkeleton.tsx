import { cn } from '../../lib';
import { DetailTableSkeleton } from './DetailSkeletons';
import { Skeleton } from './Skeleton';

type Props = { charts?: number };

export function MetricsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Skeleton className="h-30 w-full" />
      <Skeleton className="h-30 w-full" />
      <Skeleton className="h-30 w-full" />
      <Skeleton className="h-30 w-full" />
    </div>
  );
}

export function MetricsSkeleton({ charts = 1 }: Props) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-5 w-56" />
        </div>

        <Skeleton className="h-9 w-36" />
      </div>

      <MetricsCardsSkeleton />

      <div
        className={cn(
          'w-full',
          charts > 1 && 'grid grid-cols-1 gap-4 lg:grid-cols-2',
        )}
      >
        {Array.from({ length: charts }).map((_, i) => (
          <Skeleton key={`metrics-chart-${i}`} className="h-94 w-full" />
        ))}
      </div>

      <DetailTableSkeleton />
    </>
  );
}
