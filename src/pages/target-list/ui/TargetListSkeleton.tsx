import { Card, PaginationSkeleton, Skeleton } from '@/shared/ui/index.initial';

function TargetCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="space-y-4 px-6">
        <div className="flex items-start justify-between">
          <Skeleton className="size-10 rounded-lg" />
          <div className="flex gap-1.5">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-2/3" />
        </div>
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
      <div className="px-6">
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </Card>
  );
}

export function TargetListSkeleton() {
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-8 w-9.25 md:w-20 lg:w-39" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-6" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <TargetCardSkeleton key={i} />
        ))}
      </div>

      <PaginationSkeleton />
    </>
  );
}
