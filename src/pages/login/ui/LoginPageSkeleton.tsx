import { Skeleton } from '@/shared/ui/index.initial';

export function LoginSkeleton() {
  return (
    <main className="flex min-h-svh w-full items-center justify-center overflow-x-hidden p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="mb-8 flex items-center justify-center">
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="bg-card space-y-6 rounded-xl border p-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-3xs" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="space-y-7">
            <div className="space-y-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-9 w-full" />
            </div>
            <Skeleton className="h-9 w-full" />
          </div>

          <div className="flex w-full items-center justify-center gap-4">
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
          </div>
        </div>
      </div>
    </main>
  );
}
