import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { buttonVariants, cn } from '../lib';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './Card';
import { Table } from './table';
import {
  DynamicPagination,
  type DynamicPaginationProps,
} from './pagination/DynamicPagination';
import { Badge } from './badge';
import { SearchField } from './SearchField';

type TableCardProps = Omit<DynamicPaginationProps, 'maxPages'> & {
  title: string;
  header?: ReactNode;
  headerClassName?: string;
  children: ReactNode;
};

const MAX_VISIBLE_PAGES = 5;

export function TableCard({
  title,
  basePath,
  currentPage,
  totalItems,
  itemsPerPage,
  children,
  header,
  headerClassName,
}: TableCardProps) {
  const maxPages = Math.max(totalItems / itemsPerPage, 1);

  return (
    <Card>
      <CardHeader>
        <div
          className={cn(
            'flex flex-col justify-between gap-4 lg:flex-row',
            headerClassName,
          )}
        >
          <CardTitle className="flex items-center gap-2">
            <h2>{title}</h2>
            <Badge variant="secondary" className="tabular-nums">
              {totalItems}
            </Badge>
          </CardTitle>
          {header}
        </div>
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

type Props = { placeholder: string; createText: string; basePath: string };

export function TableCardHeader({ placeholder, createText, basePath }: Props) {
  return (
    <div className="flex w-full flex-col gap-2 lg:w-fit lg:flex-row lg:items-center">
      <SearchField placeholder={placeholder} />
      <Link
        to={`${basePath}/new`}
        className={buttonVariants({ size: 'sm', className: 'shrink-0' })}
      >
        <Plus className="mr-1.5 size-4" />
        {createText}
      </Link>
    </div>
  );
}
