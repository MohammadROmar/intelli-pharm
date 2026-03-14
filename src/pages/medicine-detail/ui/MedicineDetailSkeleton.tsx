import {
  Skeleton,
  Separator,
  Card,
  CardHeader,
  CardContent,
} from '@/shared/ui/index.initial';

function DetailCellSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-2.5 w-16" />
      <Skeleton className="h-5 w-28" />
    </div>
  );
}

function DetailHeaderLoader() {
  return (
    <CardHeader className="gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="size-6" />
        <Skeleton className="h-5 w-40" />
      </div>
      <Skeleton className="h-3 w-60" />
    </CardHeader>
  );
}

function DetailRowSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <DetailCellSkeleton />
      <DetailCellSkeleton />
    </div>
  );
}

export function MedicineDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Skeleton className="h-8 w-56" />
        </div>

        <Skeleton className="h-8 w-full shrink-0 rounded-md sm:w-28" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-16 shrink-0 rounded-lg" />
            ))}
          </div>
        </div>

        <Card className="h-fit">
          <DetailHeaderLoader />
          <CardContent className="space-y-5">
            <DetailRowSkeleton />
            <Separator />

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-2.5 w-16" />
                <Skeleton className="h-7 w-24" />
              </div>
              <DetailCellSkeleton />
            </div>
            <Separator />

            <DetailRowSkeleton />
            <Separator />

            <DetailRowSkeleton />
          </CardContent>
        </Card>
      </div>

      <Card>
        <DetailHeaderLoader />
        <CardContent className="overflow-x-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-b px-4 py-4 last:border-0">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
