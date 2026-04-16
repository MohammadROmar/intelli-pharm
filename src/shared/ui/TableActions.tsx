import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Info, Pencil, Trash2, MoreHorizontal } from 'lucide-react';

import { TableCell } from './table';
import { Button } from './Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './DropdownMenu';

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

  if (!ctx) {
    throw new Error(
      'TableActions compound components must be used within <TableActions>',
    );
  }

  return ctx;
}

type TableActionsProps<T> = {
  itemId: string | number;
  path?: string;
  item: T;
  onDelete?: (item: T) => void;
  children: React.ReactNode;
};

function TableActionsRoot<T>({
  itemId,
  path,
  item,
  onDelete,
  children,
}: TableActionsProps<T>) {
  const { t } = useTranslation('translation', { keyPrefix: 'tableActions' });

  return (
    <TableActionsContext.Provider
      value={
        { itemId, path, item, onDelete } as TableActionsContextValue<unknown>
      }
    >
      <TableCell className="relative z-10 w-[1%] whitespace-nowrap">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0!">
              <span className="sr-only">{t('openActions')}</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-36" align="end">
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableActionsContext.Provider>
  );
}

function Detail() {
  const { path, itemId } = useTableActions();
  const { t } = useTranslation('translation', { keyPrefix: 'tableActions' });

  return (
    <DropdownMenuItem asChild>
      <Link to={`${path}/${itemId}`} className="cursor-pointer">
        <Info className="size-4" />
        <span>{t('details')}</span>
      </Link>
    </DropdownMenuItem>
  );
}

function Update() {
  const { path, itemId } = useTableActions();
  const { t } = useTranslation('translation', { keyPrefix: 'tableActions' });

  return (
    <DropdownMenuItem asChild>
      <Link to={`${path}/${itemId}/edit`} className="cursor-pointer">
        <Pencil className="size-4" />
        <span>{t('update')}</span>
      </Link>
    </DropdownMenuItem>
  );
}

function Delete<T>() {
  const { item, onDelete } = useTableActions<T>();
  const { t } = useTranslation('translation', { keyPrefix: 'tableActions' });

  return (
    <DropdownMenuItem
      onClick={() => onDelete(item)}
      variant="destructive"
      className="cursor-pointer"
    >
      <Trash2 className="size-4" />
      <span>{t('delete')}</span>
    </DropdownMenuItem>
  );
}

export const TableActions = Object.assign(TableActionsRoot, {
  Detail,
  Update,
  Delete,
});
