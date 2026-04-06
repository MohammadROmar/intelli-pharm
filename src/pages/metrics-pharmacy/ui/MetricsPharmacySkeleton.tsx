import { DetailTableSkeleton, Skeleton } from '@/shared/ui/index.initial';

export function MetricsPharmacySkeleton() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-5 w-56" style={{ animationDelay: '0.25s' }} />
        </div>

        <Skeleton className="h-9 w-36" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Skeleton className="h-30 w-full" />
        <Skeleton className="h-30 w-full" />
        <Skeleton className="h-30 w-full" />
        <Skeleton className="h-30 w-full" />
      </div>

      <Skeleton className="h-94 w-full" />

      <DetailTableSkeleton />
    </>
  );
}
