import type { ElementType, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { Table } from './table';
import { Badge } from './badge';
import { PerPageSelect } from './PerPageSelect';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './Card';
import {
  DynamicPagination,
  type DynamicPaginationProps,
} from './pagination/DynamicPagination';
import { buttonVariants } from '../lib';

type AddButtonProps =
  | { addHref: string; addLabel: string; icon?: ElementType }
  | { addHref?: never; addLabel?: never; icon?: never };

type TableCardProps = Omit<DynamicPaginationProps, 'maxPages' | 'extraParams'> &
  AddButtonProps & {
    title: string;
    currItemsCount: number;
    children: ReactNode;
    toolbar?: ReactNode;
  };

const MAX_VISIBLE_PAGES = 5;

export function TableCard({
  title,
  basePath,
  currentPage,
  totalItems,
  itemsPerPage,
  currItemsCount,
  toolbar,
  addHref,
  addLabel,
  icon,
  children,
}: TableCardProps) {
  const maxPages = Math.ceil(totalItems / itemsPerPage);

  const isTotalEmpty = totalItems === 0;
  const isFilterEmpty = !isTotalEmpty && currItemsCount === 0;
  const hasNoRows = isTotalEmpty || isFilterEmpty;

  const Icon = icon ? icon : Plus;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3 overflow-hidden">
          <CardTitle className="flex min-w-0 items-center gap-2">
            <span>{title}</span>
            <Badge variant="secondary" className="shrink-0 tabular-nums">
              {totalItems}
            </Badge>
          </CardTitle>

          {(toolbar || addHref) && (
            <div className="flex shrink-0 items-center gap-2">
              {toolbar}
              {addHref && (
                <Link to={addHref} className={buttonVariants({ size: 'sm' })}>
                  <Icon className="size-4" aria-hidden />
                  <span className="sr-only sm:not-sr-only">{addLabel}</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {hasNoRows ? children : <Table>{children}</Table>}
      </CardContent>

      {!isTotalEmpty && (
        <CardFooter className="flex flex-col gap-4 sm:items-center sm:justify-between">
          <DynamicPagination
            itemsPerPage={itemsPerPage}
            maxVisiblePages={MAX_VISIBLE_PAGES}
            totalItems={totalItems}
            basePath={basePath}
            currentPage={currentPage}
            maxPages={maxPages}
          />

          <PerPageSelect />
        </CardFooter>
      )}
    </Card>
  );
}
