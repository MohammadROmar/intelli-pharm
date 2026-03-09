import type { PropsWithChildren } from 'react';

import {
  Table,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  DynamicPagination,
} from '@/shared/ui';

type TableCardProps = {
  title: string;
  currentPage: number;
  basePath: string;
  totalItems: number;
  maxPages: number;
} & PropsWithChildren;

const ITEMS_PER_PAGE = 10;
const MAX_VISIBLE_PAGES = 5;

export function TableCard({
  title,
  basePath,
  currentPage,
  maxPages,
  totalItems,
  children,
}: TableCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>{children}</Table>
      </CardContent>
      <CardFooter>
        <DynamicPagination
          itemsPerPage={ITEMS_PER_PAGE}
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
