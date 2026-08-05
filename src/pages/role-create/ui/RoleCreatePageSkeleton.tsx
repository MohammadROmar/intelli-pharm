import { Skeleton } from '@/shared/ui/index.initial';

const MODULE_SKELETONS = [0, 1, 2, 3] as const;

export function RoleCreatePageSkeleton() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-center gap-3 pb-6">
        <Skeleton className="size-8 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-6">
        <div className="grid grid-cols-1 gap-2 sm:max-w-sm">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-9 w-full" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-6">
          <Skeleton className="h-9 w-full sm:max-w-xs" />

          {MODULE_SKELETONS.map((index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
