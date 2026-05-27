import { Skeleton } from '@/shared/ui';

function SummaryCardSkeleton() {
  return (
    <div className="px-6 py-4">
      <div className="mb-3 flex items-center gap-2">
        <Skeleton className="h-3.5 w-3.5 rounded" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-muted/40 rounded-lg px-4 py-3">
            <Skeleton className="mb-2 h-3 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
        ))}
      </div>

      <div className="bg-border mt-4 h-px w-full" />
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <tr>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-36" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-28" />
      </td>
      <td className="px-4 py-3 text-right">
        <Skeleton className="ml-auto h-4 w-8" />
      </td>
      <td className="px-4 py-3 text-right">
        <Skeleton className="ml-auto h-4 w-8" />
      </td>
      <td className="px-4 py-3 text-right">
        <Skeleton className="ml-auto h-4 w-20" />
      </td>
      <td className="px-4 py-3 text-right">
        <Skeleton className="ml-auto h-4 w-20" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-24" />
      </td>
    </tr>
  );
}

export function SeasonalMetricsSkeleton() {
  return (
    <div className="rounded-xl border">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3.5 w-56" />
        </div>
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      <SummaryCardSkeleton />

      {/* Table */}
      <div className="w-full overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {Array.from({ length: 7 }).map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <Skeleton className="h-3.5 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center justify-between gap-4 p-4 sm:flex-row">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}
