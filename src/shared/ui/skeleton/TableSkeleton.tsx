import { Card, CardContent, CardFooter, CardHeader } from '../Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';
import { Skeleton } from './Skeleton';

export function TableSkeleton() {
  return (
    <div className="space-y-4 overflow-y-hidden">
      <div className="space-y-2">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-5 w-56" style={{ animationDelay: '0.25s' }} />
      </div>

      <Card>
        <CardHeader className="flex! flex-row items-center! justify-between gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-6" />
          </div>
          <Skeleton className="h-8 w-20" />
        </CardHeader>
        <CardContent>
          <Table className="h-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">
                  <Skeleton
                    className="h-6"
                    style={{ animationDelay: '0.5s' }}
                  />
                </TableHead>
                {Array.from({ length: 3 }).map((_, i) => (
                  <TableHead key={`table-skeleton-head-${i}`}>
                    <Skeleton
                      className="h-6"
                      style={{ animationDelay: '0.5s' }}
                    />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={`table-skeleton-row-${i}`}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <TableCell
                      key={`table-skeleton-row-cell-${i}`}
                      className="py-3"
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
          </Table>
        </CardContent>
        <CardFooter className="flex w-full flex-col items-center justify-center gap-3 lg:flex-row lg:justify-between">
          <Skeleton className="h-5 w-[70%] lg:w-36" />
          <Skeleton className="h-9 w-[80%] lg:w-80" />
        </CardFooter>
      </Card>
    </div>
  );
}
