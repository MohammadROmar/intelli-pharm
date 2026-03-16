import type { ReactNode } from 'react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './Card';
import { Table } from './table';
import {
  DynamicPagination,
  type DynamicPaginationProps,
} from './pagination/DynamicPagination';
import { Badge } from './badge';

type TableCardProps = DynamicPaginationProps & {
  title: string;
  header?: ReactNode;
  children: ReactNode;
};

const MAX_VISIBLE_PAGES = 5;

export function TableCard({
  title,
  basePath,
  currentPage,
  maxPages,
  totalItems,
  itemsPerPage,
  children,
  header,
}: TableCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col justify-between gap-4 lg:flex-row">
        <CardTitle className="flex items-center gap-2">
          <h2>{title}</h2>
          <Badge variant="secondary" className="tabular-nums">
            {totalItems}
          </Badge>
        </CardTitle>
        {header}
      </CardHeader>
      <CardContent>
        <Table>{children}</Table>
      </CardContent>
      <CardFooter>
        <DynamicPagination
          itemsPerPage={itemsPerPage}
          maxVisiblePages={MAX_VISIBLE_PAGES}
          totalItems={totalItems}
          basePath={basePath}
          currentPage={currentPage}
          maxPages={maxPages}
        />
      </CardFooter>
    </Card>
  );
}
