import { Skeleton } from '@/shared/ui/index.initial';

export function OrderDetailSkeleton() {
  return (
    <div className="space-y-5 pb-8" aria-hidden="true">
      <div className="bg-card space-y-5 rounded-2xl border p-5 sm:p-6">
        <Skeleton className="h-5 w-36" />
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-5 w-40" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      <div className="bg-card grid overflow-hidden rounded-2xl border sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex gap-3 border-b p-4 xl:border-b-0">
            <Skeleton className="size-9 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-full max-w-32" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="bg-card space-y-4 rounded-2xl border p-5 xl:col-start-1 xl:row-start-1">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-72 w-full" />
        </div>
        <div className="space-y-5 xl:col-start-2 xl:row-start-1">
          <Skeleton className="h-72 w-full rounded-2xl" />
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
