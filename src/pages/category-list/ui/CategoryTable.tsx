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
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  TableEmptyState,
  FiltersTrigger,
} from '@/shared/ui';

type Props = { data: CategoryListResponse };

export function CategoriesTable({ data }: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'categoriesPage' });

  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryListItem | null>(null);

  const categories = data.data;

  return (
    <>
      <DeleteCategoryModal
        label={categoryToDelete?.name}
        category={categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
      />

      <TableCard
        title={t('list.all')}
        toolbar={<CategoryFilters />}
        addHref="/dashboard/categories/new"
        addLabel={t('list.add')}
        currItemsCount={categories.length}
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
          <EmptyState />
        )}
      </TableCard>
    </>
  );
}

function CategoryFilters() {
  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    useCategoryFilters();

  return (
    <>
      <FiltersTrigger onClick={() => setOpen(true)} activeCount={activeCount} />
      <CategoryFiltersModal
        open={open}
        onOpenChange={setOpen}
        defaultValues={filters}
        hasActiveFilters={hasActiveFilters}
        onApply={(v) => {
          applyFilters(v);
          setOpen(false);
        }}
        onClear={() => {
          clearFilters();
          setOpen(false);
        }}
      />
    </>
  );
}

function EmptyState() {
  const { hasActiveFilters, clearFilters } = useCategoryFilters();

  return (
    <TableEmptyState
      variant={hasActiveFilters ? 'search' : 'empty'}
      onClearSearch={clearFilters}
    />
  );
}
