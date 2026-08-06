import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteCategoryModal } from '@/features/category-delete';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
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

import { CategoryRow, type CategoryRowActionAccess } from './CategoryRow';
import { CategoryFiltersModal } from './CategoryFiltersModal';
import { useCategoryFilters } from '../model/useCategoryFilters';

type Props = { data: CategoryListResponse };

export function CategoriesTable({ data }: Props) {
  const { t } = useTranslation('categories');
  const grantedPermissions = useGrantedPermissions();

  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryListItem | null>(null);

  const filtersState = useCategoryFilters();

  const canCreate = hasPermission(grantedPermissions, 'erp.categories.create');
  const canView = hasPermission(grantedPermissions, 'erp.categories.view');
  const canUpdate = hasPermission(grantedPermissions, 'erp.categories.update');
  const canDelete = hasPermission(grantedPermissions, 'erp.categories.delete');

  const actionAccess = useMemo<CategoryRowActionAccess>(
    () => ({
      canView,
      canUpdate,
      canDelete,
      hasAnyRowAction: canView || canUpdate || canDelete,
    }),
    [canDelete, canUpdate, canView],
  );

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
            {actionAccess.hasAnyRowAction ? (
              <TableHead>{t('list.actions')}</TableHead>
            ) : null}
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
