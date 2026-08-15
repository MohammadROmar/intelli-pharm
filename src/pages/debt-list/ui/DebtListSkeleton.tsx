import { Skeleton } from '@/shared/ui/index.initial';

export function DebtListSkeleton() {
  return (
    <div className="space-y-5 pb-8" aria-hidden="true">
      <div className="space-y-3">
        <Skeleton className="h-8 w-full max-w-44" />
        <Skeleton className="h-5 w-full max-w-xl" />
      </div>

      <div className="bg-card rounded-3xl border p-5 sm:p-6 lg:p-7">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-start gap-3">
            <Skeleton className="h-4 w-full max-w-40" />
            <Skeleton className="h-10 w-full max-w-72 lg:h-12" />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-6 sm:mt-8 sm:gap-12">
            {Array.from({ length: 2 }, (_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-full max-w-24" />
                <Skeleton className="h-7 w-full max-w-40" />
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3 sm:mt-6">
            <Skeleton className="h-2.5 w-full rounded-full sm:h-3" />
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-4 w-full max-w-24" />
              <Skeleton className="h-4 w-full max-w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-full max-w-28" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="w-full space-y-2 lg:w-60">
            <Skeleton className="h-3 w-full max-w-16" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-6 w-full max-w-36" />
        <Skeleton className="h-4 w-full max-w-24" />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="bg-card space-y-5 rounded-2xl border p-5">
            <div className="flex justify-between gap-4">
              <div className="flex flex-1 gap-3">
                <Skeleton className="size-10 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-full max-w-40" />
                  <Skeleton className="h-3 w-full max-w-28" />
                </div>
              </div>
              <Skeleton className="h-6 w-full max-w-24 rounded-full" />
            </div>
            <div className="space-y-3 rounded-xl border p-4">
              <Skeleton className="h-3 w-full max-w-28" />
              <Skeleton className="h-8 w-full max-w-48" />
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="h-3 w-full max-w-3/4" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
            </div>
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t pt-4 lg:flex-row">
        <Skeleton className="h-5 w-full max-w-48" />
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="size-9 rounded-md" />
          ))}
        </div>
        <Skeleton className="h-9 w-full max-w-28" />
      </div>
    </div>
  );
}
