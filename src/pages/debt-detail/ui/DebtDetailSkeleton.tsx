import { Skeleton } from "@/shared/ui";

export function DebtDetailSkeleton() {
  return (
    <div className="space-y-5 pb-8" aria-hidden="true">
      <div className="space-y-5 rounded-2xl border bg-card p-5 sm:p-6">
        <Skeleton className="h-5 w-36" />
        <div className="space-y-3">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="flex gap-3 border-b p-4 last:border-b-0 sm:odd:border-e sm:[&:nth-child(3)]:border-b-0 xl:border-b-0 xl:border-e xl:last:border-e-0"
            >
              <Skeleton className="size-9 shrink-0 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-full max-w-32" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3 border-t bg-muted/20 p-5">
          <div className="flex justify-between gap-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-14" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-5 xl:col-start-1 xl:row-start-1">
          <div className="space-y-4 rounded-2xl border bg-card p-5">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-80 w-full" />
          </div>
          <div className="space-y-4 rounded-2xl border bg-card p-5">
            <Skeleton className="h-6 w-40" />
            <div className="grid gap-3 lg:grid-cols-2">
              <Skeleton className="h-60 w-full rounded-xl" />
              <Skeleton className="h-60 w-full rounded-xl" />
            </div>
          </div>
        </div>
        <Skeleton className="h-96 w-full rounded-2xl xl:col-start-2 xl:row-start-1" />
      </div>
    </div>
  );
}
