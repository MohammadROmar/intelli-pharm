import { Skeleton } from './Skeleton';
import { TableCardSkeleton } from './TableSkeleton';

export function MetricsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
  );
}

export function MetricsSkeleton() {
  return (
    <>
      <div className="space-y-2">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-5 w-56" />
      </div>

      <MetricsCardsSkeleton />
      <TableCardSkeleton />
    </>
  );
}
