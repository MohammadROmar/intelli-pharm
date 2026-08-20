import { Card, CardContent, Skeleton } from '@/shared/ui';

function ProfileCardSkeleton() {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-xl" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-52 max-w-full" />
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
      <Card className="overflow-hidden">
        <div className="bg-muted h-1.5" />

        <CardContent className="flex items-center gap-5 p-5 sm:p-7">
          <Skeleton className="size-20 shrink-0 rounded-2xl" />

          <div className="min-w-0 flex-1 space-y-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-56 max-w-full" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProfileCardSkeleton />
        <ProfileCardSkeleton />
      </div>

      <Card>
        <CardContent className="flex items-center gap-3 p-5">
          <Skeleton className="size-10 rounded-xl" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-3 w-72 max-w-full" />
          </div>

          <Skeleton className="h-6 w-10 rounded-full" />
        </CardContent>
      </Card>
    </div>
  );
}
