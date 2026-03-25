import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteCategoryModal } from '@/features/category-delete';
import {
  CategoryRow,
  type CategoryListItem,
  type CategoryListResponse,
} from '@/entities/category';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  TableCardHeader,
  TableEmptyState,
} from '@/shared/ui';

type Props = {
  data: CategoryListResponse;
};

export function CategoriesTable({ data }: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'categoriesPage' });

  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryListItem | null>(null);

  const categories = data.data;

  return (
    <>
      <DeleteCategoryModal
        category={categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
      />

      <TableCard
        title={t('list.all')}
        header={
          <TableCardHeader
            createText={t('create.title')}
            placeholder={t('searchPlaceholder')}
            basePath="/dashboard/categories"
          />
        }
        basePath="/dashboard/categories"
        currentPage={data.meta.current_page}
        totalItems={data.meta.total}
        itemsPerPage={data.meta.per_page}
      >
        {categories.length > 0 ? (
          <>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">{t('list.id')}</TableHead>
                <TableHead>{t('list.name')}</TableHead>
                <TableHead>{t('list.parentName')}</TableHead>
                <TableHead>{t('list.createdAt')}</TableHead>
                <TableHead>{t('list.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <CategoryRow
                  key={category.id}
                  category={category}
                  onDelete={setCategoryToDelete}
                />
              ))}
            </TableBody>
          </>
        ) : (
          <TableEmptyState variant="empty" />
        )}
      </TableCard>
    </>
  );
}
