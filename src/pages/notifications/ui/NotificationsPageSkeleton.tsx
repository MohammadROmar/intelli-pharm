import {
  Card,
  CardContent,
  DetailHeaderSkeleton,
  PaginationSkeleton,
  Separator,
  Skeleton,
} from '@/shared/ui/index.initial';

const SKELETON_COUNT = 5;

export function NotificationsPageSkeleton() {
  return (
    <div className="container mx-auto max-w-3xl">
      <Card className="gap-4!">
        <div className="space-y-2">
          <DetailHeaderSkeleton />
          <div className="px-6">
            <Skeleton className="h-8 w-45" />
          </div>
        </div>
        <Separator />

        <div className="border-border/60 flex items-center gap-2 border-b px-6 pb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-6" />
        </div>

        <CardContent className="divide-y p-0!">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 px-6 py-4">
              <Skeleton className="mt-0.5 size-8 shrink-0 rounded-lg" />

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-14 shrink-0" />
                </div>
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>
            </div>
          ))}
        </CardContent>

        <PaginationSkeleton />
      </Card>
    </div>
  );
}
