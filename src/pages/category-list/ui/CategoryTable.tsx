import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CategoryFiltersModal } from './CategoryFiltersModal';
import { useCategoryFilters } from '../model/useCategoryFilters';
import { DeleteCategoryModal } from '@/features/category-delete';
import {
  CategoryRow,
  type CategoryListItem,
  type CategoryListResponse,
} from '@/entities/category';
import {
  TableHead,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

type Props = { data: CategoryListResponse };

export function CategoriesTable({ data }: Props) {
  const { t } = useTranslation('categories');

  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryListItem | null>(null);

  const filtersState = useCategoryFilters();

  return (
    <>
      <DeleteCategoryModal
        label={categoryToDelete?.name}
        category={categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
      />

      <EntityListTable
        data={data}
        title={t('list.all')}
        addHref="/dashboard/categories/new"
        addLabel={t('list.add')}
        basePath="/dashboard/categories"
        toolbar={
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={CategoryFiltersModal}
          />
        }
        columns={
          <>
            <TableHead className="w-25">{t('list.id')}</TableHead>
            <TableHead>{t('list.name')}</TableHead>
            <TableHead>{t('list.parentName')}</TableHead>
            <TableHead>{t('list.createdAt')}</TableHead>
            <TableHead>{t('list.actions')}</TableHead>
          </>
        }
        renderRow={(category) => (
          <CategoryRow
            key={category.id}
            category={category}
            onDelete={setCategoryToDelete}
          />
        )}
        emptyState={
          <EntityEmptyState
            hasActiveFilters={filtersState.hasActiveFilters}
            clearFilters={filtersState.clearFilters}
          />
        }
      />
    </>
  );
}
