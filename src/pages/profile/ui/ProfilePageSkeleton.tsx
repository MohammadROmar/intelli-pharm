import { Card, CardContent, Skeleton } from '@/shared/ui';

function ProfileCardSkeleton() {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-xl" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-36" />
            <Skeleton className="h-3 w-full max-w-52" />
          </div>
        </div>

        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
      </CardContent>
    </Card>
  );
}

export function ProfilePageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-8" aria-hidden>
      <div className="bg-card space-y-5 rounded-2xl border p-5 sm:p-6">
        <Skeleton className="h-5 w-full max-w-36" />
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-8 w-full max-w-52" />
            <Skeleton className="h-5 w-full max-w-40" />
          </div>
          <Skeleton className="h-10 w-full max-w-40" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
      </div>

      <Card>
        <CardContent className="flex items-center gap-3 p-5">
          <Skeleton className="size-10 rounded-xl" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full max-w-44" />
            <Skeleton className="h-3 w-full max-w-72" />
          </div>

          <Skeleton className="h-6 w-full max-w-10 rounded-full" />
        </CardContent>
      </Card>
    </div>
  );
}
