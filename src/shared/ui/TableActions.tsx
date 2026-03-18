import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Info, Pencil, Trash2 } from 'lucide-react';

import { TableCell } from './table';
import { buttonVariants } from '../lib';
import { Button } from './Button';
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';

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

function Detail() {
  const { path, itemId } = useTableActions();
  const { t } = useTranslation('translation', { keyPrefix: 'tableActions' });

  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild>
        <Link
          to={`${path}/${itemId}`}
          aria-label={t('details')}
          className={buttonVariants({ size: 'sm', variant: 'ghost' })}
        >
          <Info className="size-4" />
        </Link>
      </TooltipTrigger>
      <TooltipContent>{t('details')}</TooltipContent>
    </Tooltip>
  );
}

function Update() {
  const { path, itemId } = useTableActions();
  const { t } = useTranslation('translation', { keyPrefix: 'tableActions' });

  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild>
        <Link
          to={`${path}/${itemId}/edit`}
          aria-label={t('update')}
          className={buttonVariants({ size: 'sm', variant: 'ghost' })}
        >
          <Pencil className="size-4" />
        </Link>
      </TooltipTrigger>
      <TooltipContent>{t('update')}</TooltipContent>
    </Tooltip>
  );
}

function Delete<T>() {
  const { item, onDelete } = useTableActions<T>();
  const { t } = useTranslation('translation', { keyPrefix: 'tableActions' });

  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild>
        <Button
          size="sm"
          aria-label={t('delete')}
          variant="ghost"
          onClick={() => onDelete(item)}
        >
          <Trash2 className="text-destructive size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t('delete')}</TooltipContent>
    </Tooltip>
  );
}

export const TableActions = Object.assign(TableActionsRoot, {
  Detail,
  Update,
  Delete,
});
