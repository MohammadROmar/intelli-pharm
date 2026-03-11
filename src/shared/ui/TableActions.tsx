import { createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Info, Pencil, Trash2 } from 'lucide-react';

import { TableCell } from './table';
import { buttonVariants } from '../lib';
import { Button } from './Button';

// ---- Context ----

type TableActionsContextValue<T> = {
  itemId: string | number;
  path: string;
  item: T;
  onDelete: (item: T) => void;
};

const TableActionsContext =
  createContext<TableActionsContextValue<unknown> | null>(null);

function useTableActions<T>() {
  const ctx = useContext(
    TableActionsContext as React.Context<TableActionsContextValue<T> | null>,
  );
  if (!ctx)
    throw new Error(
      'TableActions compound components must be used within <TableActions>',
    );
  return ctx;
}

// ---- Root ----

type TableActionsProps<T> = {
  itemId: string | number;
  path: string;
  item: T;
  onDelete: (item: T) => void;
  children: React.ReactNode;
};

function TableActionsRoot<T>({
  itemId,
  path,
  item,
  onDelete,
  children,
}: TableActionsProps<T>) {
  return (
    <TableActionsContext.Provider
      value={
        { itemId, path, item, onDelete } as TableActionsContextValue<unknown>
      }
    >
      <TableCell className="relative z-10 flex items-center gap-1">
        {children}
      </TableCell>
    </TableActionsContext.Provider>
  );
}

// ---- Sub-components ----

function Detail() {
  const { path, itemId } = useTableActions();
  return (
    <Link
      to={`${path}/${itemId}`}
      className={buttonVariants({ size: 'sm', variant: 'ghost' })}
    >
      <Info className="size-4" />
    </Link>
  );
}

function Edit() {
  const { path, itemId } = useTableActions();
  return (
    <Link
      to={`${path}/${itemId}/edit`}
      className={buttonVariants({ size: 'sm', variant: 'ghost' })}
    >
      <Pencil className="size-4" />
    </Link>
  );
}

function Delete<T>() {
  const { item, onDelete } = useTableActions<T>();
  return (
    <Button size="sm" variant="ghost" onClick={() => onDelete(item)}>
      <Trash2 className="text-destructive size-4" />
    </Button>
  );
}

// ---- Export ----

export const TableActions = Object.assign(TableActionsRoot, {
  Detail,
  Edit,
  Delete,
});
