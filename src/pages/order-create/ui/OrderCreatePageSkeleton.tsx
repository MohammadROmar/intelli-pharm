import { Skeleton } from '@/shared/ui/index.initial';

export function OrderCreatePageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-5" aria-hidden="true">
      <div className="space-y-2">
        <Skeleton className="h-8 w-full max-w-48" />
        <Skeleton className="h-4 w-full max-w-80" />
      </div>

      <div className="flex items-center gap-3">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="h-px flex-1" />
        <Skeleton className="size-9 rounded-full" />
      </div>

      <div className="rounded-xl border p-5">
        <div className="mb-6 flex items-center gap-3">
          <Skeleton className="size-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full max-w-40" />
            <Skeleton className="h-3 w-full max-w-72" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
        <Skeleton className="mt-6 h-28 w-full" />
      </div>
    </div>
  );
}
