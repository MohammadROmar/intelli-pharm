import {
  Separator,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Skeleton,
} from '@/shared/ui';

const SKELETON_NOTES = [0, 1, 2] as const;

export function VisitSheetSkeleton() {
  return (
    <>
      <SheetHeader className="border-b pb-5">
        <SheetTitle>
          <Skeleton className="h-5 w-36" />
        </SheetTitle>
        <SheetDescription asChild>
          <Skeleton className="h-4 w-28" />
        </SheetDescription>
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </SheetHeader>

      <div className="flex flex-col gap-3 px-4 py-1">
        <div className="flex items-start gap-3">
          <Skeleton className="size-9 shrink-0 rounded-lg" />
          <div className="space-y-1.5 pt-0.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
        <Skeleton className="h-14 w-full rounded-lg" />
      </div>

      <Separator />

      <div className="flex flex-col gap-3 px-4 py-1">
        <div className="flex items-start gap-3">
          <Skeleton className="size-9 shrink-0 rounded-lg" />
          <div className="space-y-1.5 pt-0.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-44" />
          </div>
        </div>

        {SKELETON_NOTES.map((i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </>
  );
}
