import { Skeleton } from '@/shared/ui';

export function MedicineCatalogSkeleton() {
  return (
    <div className="space-y-3" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="rounded-xl border p-3.5">
          <div className="flex gap-3.5">
            <Skeleton className="size-14 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1 space-y-2.5">
              <div className="flex justify-between gap-4">
                <Skeleton className="h-4 w-2/5" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-3 w-3/5" />
              <Skeleton className="h-5 w-28 rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
