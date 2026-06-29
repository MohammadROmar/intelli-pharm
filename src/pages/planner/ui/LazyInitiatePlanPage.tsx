import { lazy } from 'react';

import { WithSuspense, Skeleton } from '@/shared/ui/index.initial';

const InitiatePlanPage = lazy(() => import('./InitiatePlanPage'));

function InitiatePlanPageSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Skeleton className="h-9.5 w-36 md:h-11.25" />
          <Skeleton className="h-5 w-64" />
        </div>

        <Skeleton className="h-9 w-full sm:w-24.75" />
      </div>

      <Skeleton className="h-13.5 w-full" />
      <Skeleton className="h-121 w-full rounded-xl" />

      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-11" />
        <Skeleton className="h-9 w-19.75" />
      </div>
    </div>
  );
}

export function LazyInitiatePlanPage() {
  return (
    <WithSuspense loader={<InitiatePlanPageSkeleton />}>
      <InitiatePlanPage />
    </WithSuspense>
  );
}
