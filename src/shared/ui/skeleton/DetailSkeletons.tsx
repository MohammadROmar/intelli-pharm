import { Skeleton } from './Skeleton';
import { Card, CardContent, CardHeader } from '../Card';
import { Separator } from '../Separator';
import { cn } from '../../lib';

function DetailCellSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-2.5 w-16" />
      <Skeleton className="h-5 w-28" />
    </div>
  );
}

function DetailRowSkeleton({ hasSeparator }: { hasSeparator?: boolean }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <DetailCellSkeleton />
        <DetailCellSkeleton />
      </div>
      {hasSeparator && <Separator />}
    </>
  );
}

function DetailHeaderSkeleton() {
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

type Props = {
  hasImage?: boolean;
  rows: number;
  tables: number;
};

function DetailSkeleton({ rows, tables, hasImage }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Skeleton className="h-8 w-56" />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Skeleton className="h-8 w-full shrink-0 rounded-md sm:w-28" />
          <Skeleton className="h-8 w-full shrink-0 rounded-md sm:w-28" />
        </div>
      </div>

      <div
        className={cn(
          'grid grid-cols-1 gap-6',
          hasImage && 'lg:grid-cols-[2fr_3fr]',
        )}
      >
        {hasImage && (
          <div className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-16 shrink-0 rounded-lg" />
              ))}
            </div>
          </div>
        )}

        <Card className="h-fit">
          <DetailHeaderSkeleton />
          <CardContent className="space-y-5">
            {Array.from({ length: rows }).map((_, i) => (
              <DetailRowSkeleton
                key={`detail-row-skeleton-${i}`}
                hasSeparator={i !== rows - 1}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {Array.from({ length: tables }).map((_, i) => (
        <Card key={i}>
          <DetailHeaderSkeleton />
          <CardContent className="overflow-x-auto">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="border-b px-4 py-4 last:border-0">
                <div className="flex items-center justify-between gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export {
  DetailCellSkeleton,
  DetailRowSkeleton,
  DetailHeaderSkeleton,
  DetailSkeleton,
};
