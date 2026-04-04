import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton,
} from '@/shared/ui/index.initial';

export function ScanPageSkeleton() {
  return (
    <div className="space-y-4 overflow-y-hidden">
      <div className="space-y-2">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-5 w-56" style={{ animationDelay: '0.25s' }} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex w-full items-center justify-center">
            <Skeleton className="size-16" />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <Skeleton className="h-8 w-full max-w-32" />
            <Skeleton className="h-5 w-full max-w-64" />
          </div>
        </CardHeader>

        <CardContent>
          <Skeleton className="aspect-square w-full" />
        </CardContent>

        <CardFooter className="items-center justify-center">
          <Skeleton className="h-11.5 w-full max-w-96" />
        </CardFooter>
      </Card>
    </div>
  );
}
