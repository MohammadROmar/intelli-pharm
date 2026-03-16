import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';

import { DeleteCategoryModal } from '@/features/category-delete';
import {
  CategoryRow,
  type CategoryListItem,
  type CategoryListResponse,
} from '@/entities/category';
import { buttonVariants } from '@/shared/lib';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  SearchField,
} from '@/shared/ui';

type Props = {
  data: CategoryListResponse;
};

export function CategoriesTable({ data }: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'categoriesPage' });

  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryListItem | null>(null);

  return (
    <>
      <DeleteCategoryModal
        category={categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
      />

      <TableCard
        title={t('list.all')}
        header={<CategoriesTableHeader t={t} />}
        basePath="/dashboard/categories"
        currentPage={data.meta.current_page}
        maxPages={Math.max(data.meta.total / data.meta.per_page, 1)}
        totalItems={data.meta.total}
        itemsPerPage={data.meta.per_page}
      >
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">{t('list.id')}</TableHead>
            <TableHead>{t('list.name')}</TableHead>
            <TableHead>{t('list.createdAt')}</TableHead>
            <TableHead>{t('list.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              onDelete={(category) => {
                setCategoryToDelete(category);
              }}
            />
          ))}
        </TableBody>
      </TableCard>
    </>
  );
}

function CategoriesTableHeader({
  t,
}: {
  t: TFunction<'tranlation', 'categoriesPage'>;
}) {
  return (
    <div className="flex w-full flex-col gap-2 lg:w-fit lg:flex-row lg:items-center">
      <SearchField placeholder={t('searchPlaceholder')} />
      <Link
        to="/dashboard/categories/new"
        className={buttonVariants({ size: 'sm', className: 'shrink-0' })}
      >
        <Plus className="mr-1.5 size-4" />
        {t('create.title')}
      </Link>
    </div>
  );
}
