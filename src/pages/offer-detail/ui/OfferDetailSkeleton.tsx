/**
 * OfferDetailSkeleton.tsx
 * entities/offer/ui/OfferDetailSkeleton.tsx
 *
 * Mirrors the layout of OfferInfoCard — 4 separator-divided rows.
 */

import { Card, CardContent, CardHeader, Separator, Skeleton } from '@/shared/ui';

function DetailCellSkeleton({ wide }: { wide?: boolean }) {
  return (
    <div className="space-y-2">
      <Skeleton className="h-2.5 w-16" />
      <Skeleton className={`h-5 ${wide ? 'w-36' : 'w-24'}`} />
    </div>
  );
}

export function OfferDetailSkeleton() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Skeleton className="mt-1 size-5 shrink-0 rounded-md" />
          <div className="space-y-2.5">
            <Skeleton className="h-8 w-36" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-3 w-2"  />
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>

      {/* Info card */}
      <Card>
        <CardHeader>
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-6">
            <DetailCellSkeleton />
            <DetailCellSkeleton />
          </div>
          <Separator />
          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-6">
            <DetailCellSkeleton wide />
            <DetailCellSkeleton />
          </div>
          <Separator />
          {/* Row 3 — type-specific */}
          <div className="grid grid-cols-2 gap-6">
            <DetailCellSkeleton wide />
            <DetailCellSkeleton />
          </div>
          <Separator />
          {/* Row 4 — dates */}
          <div className="grid grid-cols-2 gap-6">
            <DetailCellSkeleton wide />
            <DetailCellSkeleton wide />
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
