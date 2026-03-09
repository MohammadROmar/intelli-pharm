import { Link } from 'react-router-dom';
import { Info, Pencil, Trash2 } from 'lucide-react';

import type { CategoryListItem } from '../model/categoryTypes';
import { Button, TableCell, TableRow } from '@/shared/ui';
import { buttonVariants } from '@/shared/lib';

type CategoryRowProps = {
  category: CategoryListItem;
  onDelete: (category: CategoryListItem) => void;
};

export function CategoryRow({ category, onDelete }: CategoryRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{category.id}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>{category.parentName ?? '-'}</TableCell>

      <TableCell className="relative z-10 flex items-center gap-1">
        <Link
          to={`/dashboard/categories/${category.id}`}
          className={buttonVariants({ size: 'sm', variant: 'ghost' })}
        >
          <Info className="size-4" />
        </Link>
        <Link
          to={`/dashboard/categories/${category.id}/edit`}
          className={buttonVariants({ size: 'sm', variant: 'ghost' })}
        >
          <Pencil className="size-4" />
        </Link>
        <Button size="sm" variant="ghost" onClick={() => onDelete(category)}>
          <Trash2 className="text-destructive size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
