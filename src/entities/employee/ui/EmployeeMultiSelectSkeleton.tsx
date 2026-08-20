import { Skeleton } from '@/shared/ui';

export function EmployeeMultiSelectSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5">
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="h-9 w-full" />
    </div>
  );
}
