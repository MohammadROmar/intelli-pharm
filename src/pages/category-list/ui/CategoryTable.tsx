import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCategoryAccess } from '@/features/category-access';
import { DeleteCategoryModal } from '@/features/category-delete';
import type {
  CategoryListItem,
  CategoryListResponse,
} from '@/entities/category';
import {
  TableHead,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

import { CategoryRow } from './CategoryRow';
import { CategoryFiltersModal } from './CategoryFiltersModal';
import { useCategoryFilters } from '../model/useCategoryFilters';

type Props = { data: CategoryListResponse };

export function CategoriesTable({ data }: Props) {
  const { t } = useTranslation('categories');

  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryListItem | null>(null);

  const filtersState = useCategoryFilters();

  const actionAccess = useCategoryAccess();
  const { canCreate, canDelete } = actionAccess;

  const handleDeleteModalClose = useCallback(() => {
    setCategoryToDelete(null);
  }, []);

  const renderRow = useCallback(
    (category: CategoryListItem) => (
      <CategoryRow
        key={category.id}
        category={category}
        actionAccess={actionAccess}
        onDelete={setCategoryToDelete}
      />
    ),
    [actionAccess],
  );

  return (
    <>
      {canDelete ? (
        <DeleteCategoryModal
          label={categoryToDelete?.name}
          category={categoryToDelete}
          onClose={handleDeleteModalClose}
        />
      ) : null}

      <EntityListTable
        data={data}
        title={t('list.all')}
        addButton={
          canCreate
            ? {
                addHref: '/dashboard/categories/new',
                addLabel: t('list.add'),
              }
            : undefined
        }
        basePath="/dashboard/categories"
        toolbar={
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={CategoryFiltersModal}
          />
        }
        columns={
          <>
            <TableHead>{t('list.name')}</TableHead>
            <TableHead>{t('list.parentName')}</TableHead>
            <TableHead>{t('list.createdAt')}</TableHead>
            <TableHead>{t('list.actions')}</TableHead>
          </>
        }
        renderRow={renderRow}
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
