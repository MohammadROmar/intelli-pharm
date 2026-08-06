import type { ReactNode } from 'react';

import { TableBody, TableHeader, TableRow } from './table';
import { TableCard, type AddButtonProps } from './TableCard';

type PaginatedMeta = { current_page: number; per_page: number; total: number };

export type Paginated<T> = { data: T[]; meta: PaginatedMeta };

type PresentAddButtonProps = Extract<
  AddButtonProps,
  { addHref: string; addLabel: string }
>;

type EntityListTableBaseProps<T> = {
  data: Paginated<T>;
  title: string;
  basePath: string;
  toolbar?: ReactNode;
  columns: ReactNode;
  renderRow: (item: T) => ReactNode;
  emptyState: ReactNode;
};

type EntityListTableProps<T> = EntityListTableBaseProps<T> &
  (
    | (AddButtonProps & { addButton?: never })
    | {
        addButton: PresentAddButtonProps | undefined;
        addHref?: never;
        addLabel?: never;
        icon?: never;
      }
  );

export function EntityListTable<T>({
  data,
  title,
  addButton,
  addHref,
  addLabel,
  basePath,
  toolbar,
  columns,
  icon,
  renderRow,
  emptyState,
}: EntityListTableProps<T>) {
  const items = data.data;

  const addButtonProps: AddButtonProps =
    addButton ?? (addHref && addLabel ? { addHref, addLabel, icon } : {});

  return (
    <TableCard
      title={title}
      toolbar={toolbar}
      {...addButtonProps}
      currItemsCount={items.length}
      basePath={basePath}
      currentPage={data.meta.current_page}
      totalItems={data.meta.total}
      itemsPerPage={data.meta.per_page}
    >
      {items.length > 0 ? (
        <>
          <TableHeader>
            <TableRow>{columns}</TableRow>
          </TableHeader>
          <TableBody>{items.map(renderRow)}</TableBody>
        </>
      ) : (
        emptyState
      )}
    </TableCard>
  );
}
