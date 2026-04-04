import {
  Card,
  CardContent,
  CardFooter,
  Separator,
  Skeleton,
} from '@/shared/ui/index.initial';

export function ScanResultCardSkeleton() {
  return (
    <div className="grid h-full">
      <div className="m-auto flex min-h-[70vh] w-full max-w-104.5 flex-col items-center justify-center space-y-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Skeleton className="size-3.5" />
            <Skeleton className="h-4 w-21.5" />
          </div>
          <Skeleton className="h-4 w-15" />
        </div>
        <Card className="w-full">
          <div className="space-y-3 px-6 pt-6 pb-5">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-4 w-12.5" />
              <Skeleton className="h-4 w-12.5" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6.25 w-40" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>

          <Separator />

          <CardContent className="grid grid-cols-2 gap-6 pt-5">
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-5 w-20" />
            </div>
          </CardContent>

          <Separator />

          <CardFooter className="pt-4 pb-5">
            <Skeleton className="h-9 w-full" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
