import { Skeleton } from '@/shared/ui/index.initial';

export function LiveTrackingSkeleton() {
  return (
    <>
      <div className="space-y-2">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-5 w-56" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Skeleton className="h-9 w-36.5" />
        <Skeleton className="h-9 w-31.75" />

        <div className="ms-auto">
          <Skeleton className="h-5.5 w-24.25" />
        </div>
      </div>

      <div className="flex h-140 gap-3">
        <Skeleton className="hidden h-full w-72 shrink-0 rounded-lg lg:block" />
        <Skeleton className="size-full min-w-0 flex-1" />
      </div>
    </>
  );
}
