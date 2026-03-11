import { Link } from 'react-router-dom';
import { Info, Pencil, Trash2 } from 'lucide-react';

import { TableCell } from './table';
import { buttonVariants } from '../lib';
import { Button } from './Button';

type TableActionsProps<T> = {
  itemId: string | number;
  item: T;
  path: string;
  onDelete: (item: T) => void;
};

export function TableActions<T>({
  path,
  item,
  itemId,
  onDelete,
}: TableActionsProps<T>) {
  return (
    <TableCell className="relative z-10 flex items-center gap-1">
      <Link
        to={`${path}/${itemId}`}
        className={buttonVariants({ size: 'sm', variant: 'ghost' })}
      >
        <Info className="size-4" />
      </Link>
      <Link
        to={`${path}/${itemId}/edit`}
        className={buttonVariants({ size: 'sm', variant: 'ghost' })}
      >
        <Pencil className="size-4" />
      </Link>
      <Button size="sm" variant="ghost" onClick={() => onDelete(item)}>
        <Trash2 className="text-destructive size-4" />
      </Button>
    </TableCell>
  );
}
