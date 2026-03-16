import { useTranslation } from 'react-i18next';

import type { CategoryListItem } from '../model/categoryTypes';
import { formatDate } from '@/shared/lib';
import { TableCell, TableActions, TableRow } from '@/shared/ui';

type CategoryRowProps = {
  category: CategoryListItem;
  onDelete: (category: CategoryListItem) => void;
};

export function CategoryRow({ category, onDelete }: CategoryRowProps) {
  const { i18n } = useTranslation();

  return (
    <TableRow>
      <TableCell className="font-medium">{category.id}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>{formatDate(category.created_at, i18n.language)}</TableCell>

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
