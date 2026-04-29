import { FolderTree } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { CategoryChild, CategoryDetail } from '@/entities/category';
import {
  DetailCard,
  DetailEmptyState,
  Table,
  TableActions,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

type Props = { category: CategoryDetail };

export function CategoryChildrenTable({ category }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'categoriesPage.detail',
  });

  const { children } = category;

  return (
    <DetailCard
      title={t('childrenTitle')}
      subtitle={t('childrenSubtitle')}
      icon={FolderTree}
      itemsCount={children.length}
    >
      {children.length === 0 ? (
        <DetailEmptyState label={t('noChildren')} icon={FolderTree} />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">{t('colId')}</TableHead>
              <TableHead>{t('colName')}</TableHead>
              <TableHead>{t('colActions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {children.map((child: CategoryChild) => (
              <TableRow key={child.id}>
                <TableCell className="text-muted-foreground text-xs">
                  {child.id}
                </TableCell>
                <TableCell>
                  <p className="max-w-[20ch] truncate font-medium">
                    {child.name}
                  </p>
                </TableCell>
                <TableActions
                  item={child}
                  itemId={child.id}
                  path="/dashboard/categories"
                >
                  <TableActions.Detail />
                </TableActions>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DetailCard>
  );
}
