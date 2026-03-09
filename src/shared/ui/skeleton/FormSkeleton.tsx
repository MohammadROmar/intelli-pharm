import { Skeleton } from './Skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui';

export function FormSkeleton({ fields }: { fields: number }) {
  return (
    <div className="space-y-4 overflow-y-hidden">
      <div className="space-y-2">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-5 w-56" style={{ animationDelay: '0.25s' }} />
      </div>

      <Card>
        <CardHeader className="space-y-1">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent className="space-y-7">
          {[...Array(fields)].map((_, i) => (
            <div key={`form-skeleton-field-${i}`} className="space-y-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex w-full flex-col gap-2 lg:flex-row lg:items-end lg:justify-end">
          <Skeleton className="h-9 w-full lg:w-16" />
          <Skeleton className="h-9 w-full lg:w-14" />
        </CardFooter>
      </Card>
    </div>
  );
}
