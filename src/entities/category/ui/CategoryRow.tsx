import type { CategoryListItem } from '../model/categoryTypes';
import { TableCell, TableActions, TableRow } from '@/shared/ui';

type CategoryRowProps = {
  category: CategoryListItem;
  onDelete: (category: CategoryListItem) => void;
};

export function CategoryRow({ category, onDelete }: CategoryRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{category.id}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>{category.parentName ?? '—'}</TableCell>

      <TableActions
        item={category}
        itemId={category.id}
        onDelete={onDelete}
        path="/dashboard/categories"
      >
        <TableActions.Detail />
        <TableActions.Edit />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}
