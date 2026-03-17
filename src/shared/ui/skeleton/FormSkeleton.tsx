import { Skeleton } from './Skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '../Card';

export function FormSkeleton({ fields }: { fields: number }) {
  return (
    <div className="space-y-4 overflow-y-hidden">
      <div className="space-y-2">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-5 w-56" />
      </div>

      <Card className="gap-5">
        <CardHeader className="space-y-0.5">
          <Skeleton className="h-5 w-40" style={{ animationDelay: '0.25s' }} />
          <Skeleton className="h-4 w-56" style={{ animationDelay: '0.25s' }} />
        </CardHeader>
        <CardContent className="mt-1 space-y-5">
          <div className="mb-6 flex items-start gap-3">
            <Skeleton className="size-9" style={{ animationDelay: '0.5s' }} />
            <div className="space-y-2">
              <Skeleton
                className="h-3.5 w-24"
                style={{ animationDelay: '0.5s' }}
              />
              <Skeleton
                className="h-3 w-36"
                style={{ animationDelay: '0.5s' }}
              />
            </div>
          </div>
          {Array.from({ length: fields }).map((_, i) => (
            <div key={`form-skeleton-field-${i}`} className="space-y-3">
              <Skeleton
                className="h-5 w-24"
                style={{ animationDelay: '0.75s' }}
              />
              <Skeleton
                className="h-9 w-full"
                style={{ animationDelay: '0.75s' }}
              />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex w-full flex-col gap-2 lg:flex-row lg:items-end lg:justify-end">
          <Skeleton
            className="h-9 w-full lg:w-16"
            style={{ animationDelay: '1s' }}
          />
          <Skeleton
            className="h-9 w-full lg:w-14"
            style={{ animationDelay: '1s' }}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
