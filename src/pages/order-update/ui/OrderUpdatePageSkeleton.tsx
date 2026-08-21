import { Skeleton } from '@/shared/ui/index.initial';

export function OrderUpdatePageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-5" aria-hidden="true">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <div className="rounded-xl border p-5">
        <div className="mb-5 flex items-center gap-3">
          <Skeleton className="size-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-3 w-72 max-w-full" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="mt-5 h-14 w-full" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="rounded-xl border p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-3 w-72 max-w-full" />
            </div>
            <Skeleton className="h-9 w-32" />
          </div>
          <Skeleton className="mb-4 h-10 w-full" />
          <div className="space-y-3">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="h-28 w-full rounded-xl" />
            ))}
          </div>
        </div>

        <Skeleton className="hidden h-128 rounded-xl lg:block" />
      </div>
    </div>
  );
}
