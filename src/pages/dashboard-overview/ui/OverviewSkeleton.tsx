import { Skeleton } from '@/shared/ui/index.initial';

export function OverviewSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-[37.5px] w-33.5 lg:h-11.25" />
        <Skeleton className="h-28.75 w-full sm:h-13.5 sm:w-121.75" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-30.5 rounded-xl lg:h-31.75" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.4fr_1fr]">
        <Skeleton className="h-77.5 rounded-xl" />
        <Skeleton className="h-77.5 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Skeleton className="h-25.75 rounded-xl lg:h-26.75" />
        <Skeleton className="h-25.75 rounded-xl lg:h-26.75" />
      </div>

      <Skeleton className="h-41.75 rounded-xl" />

      <div className="mt-8 mb-2 space-y-0.5">
        <Skeleton className="h-7 w-27.25" />
        <Skeleton className="h-5 w-72.25" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-28.75 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
