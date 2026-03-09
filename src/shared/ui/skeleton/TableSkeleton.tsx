import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

export function TableSkeleton() {
  return (
    <div className="space-y-4 overflow-y-hidden">
      <div className="space-y-2">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-5 w-56" style={{ animationDelay: '0.25s' }} />
      </div>

      <Table className="h-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">
              <Skeleton className="h-6" style={{ animationDelay: '0.5s' }} />
            </TableHead>
            {[...Array(3)].map((_, i) => (
              <TableHead key={`table-skeleton-head-${i}`}>
                <Skeleton className="h-6" style={{ animationDelay: '0.5s' }} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(10)].map((_, i) => (
            <TableRow key={`table-skeleton-row-${i}`}>
              {[...Array(4)].map((_, i) => (
                <TableCell
                  key={`table-skeleton-row-cell-${i}`}
                  className="font-medium"
                >
                  <Skeleton
                    className="h-6"
                    style={{ animationDelay: '0.75s' }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              <Skeleton className="h-6" style={{ animationDelay: '1s' }} />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-6" style={{ animationDelay: '1s' }} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
