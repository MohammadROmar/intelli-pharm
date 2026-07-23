import { Skeleton } from '@/shared/ui/index.initial';

export function OverviewSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-9 w-64" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-26 rounded-xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.4fr_1fr]">
        <Skeleton className="h-55 rounded-xl" />
        <Skeleton className="h-55 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Skeleton className="h-23 rounded-xl" />
        <Skeleton className="h-23 rounded-xl" />
      </div>

      <Skeleton className="h-55 rounded-xl" />

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-9 w-32 rounded-md" />
        ))}
      </div>
    </div>
  );
}
