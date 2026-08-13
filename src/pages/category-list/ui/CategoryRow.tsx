import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { CategoryListItem } from '@/entities/category';
import { formatDate } from '@/shared/lib';
import { TableCell, TableActions, TableRow } from '@/shared/ui';

type CategoryRowActionAccess = Readonly<{
  canUpdate: boolean;
  canDelete: boolean;
}>;

type CategoryRowProps = {
  category: CategoryListItem;
  actionAccess: CategoryRowActionAccess;
  onDelete: (category: CategoryListItem) => void;
};

export const CategoryRow = memo(function CategoryRow({
  category,
  actionAccess,
  onDelete,
}: CategoryRowProps) {
  const { i18n } = useTranslation();

  return (
    <TableRow>
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
        {actionAccess.canUpdate && <TableActions.Update />}
        {actionAccess.canDelete && <TableActions.Delete />}
      </TableActions>
    </TableRow>
  );
});
