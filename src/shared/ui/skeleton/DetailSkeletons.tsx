import { Skeleton } from './Skeleton';
import { Card, CardContent, CardHeader } from '../Card';
import { Separator } from '../Separator';
import { cn } from '../../lib';

function DetailCellSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-16" />
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
  cards: { rows: number }[];
  tables: number;
};

function DetailSkeleton({ cards, tables, hasImage }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-8 w-full shrink-0 rounded-md sm:w-25.25" />
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

        {cards.map(({ rows }, i) => (
          <Card key={`detail-card-skeleton-${i}`} className="h-fit">
            <DetailHeaderSkeleton />
            <CardContent className="space-y-5">
              {Array.from({ length: rows }).map((_, j) => (
                <DetailRowSkeleton
                  key={`detail-row-skeleton-${j}`}
                  hasSeparator={j !== rows - 1}
                />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {Array.from({ length: tables }).map((_, i) => (
        <DetailTableSkeleton key={`detail-table-row-${i}`} />
      ))}
    </div>
  );
}

function DetailTableSkeleton() {
  return (
    <Card>
      <DetailHeaderSkeleton />
      <CardContent className="overflow-x-auto">
        {Array.from({ length: 3 }).map((_, j) => (
          <div
            key={`detail-table-row-${j}`}
            className="border-b px-4 py-4 last:border-0"
          >
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
  );
}

export {
  DetailTableSkeleton,
  DetailCellSkeleton,
  DetailRowSkeleton,
  DetailHeaderSkeleton,
  DetailSkeleton,
};
