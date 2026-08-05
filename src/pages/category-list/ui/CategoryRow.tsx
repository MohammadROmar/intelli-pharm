import { useTranslation } from 'react-i18next';

import type { CategoryListItem } from '@/entities/category';
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
      <TableCell className="text-muted-foreground text-xs">
        {category.id}
      </TableCell>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">{category.name}</p>
      </TableCell>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">
          {category.parent_name ?? '-'}
        </p>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(category.created_at, i18n.language, false)}
      </TableCell>

      <TableActions
        item={category}
        itemId={category.id}
        onDelete={onDelete}
        path="/dashboard/categories"
      >
        <TableActions.Detail />
        <TableActions.Update />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}
