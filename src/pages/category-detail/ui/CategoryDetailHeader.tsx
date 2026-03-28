import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { DeleteCategoryModal } from '@/features/category-delete';
import type { CategoryDetail } from '@/entities/category';
import { buttonVariants } from '@/shared/lib';
import { Button } from '@/shared/ui';

type Props = { category: CategoryDetail };

export function CategoryDetailHeader({ category }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'categoriesPage.detail',
  });

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <Link
          to={`/dashboard/categories/${category.id}/edit`}
          className={buttonVariants({
            variant: 'default',
            size: 'sm',
            className: 'shrink-0',
          })}
        >
          <Pencil className="size-4" />
          {t('edit')}
        </Link>
        <DeleteCategoryBtn category={category} label={t('delete')} />
      </div>
    </div>
  );
}

function DeleteCategoryBtn({ category, label }: Props & { label: string }) {
  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryDetail | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <DeleteCategoryModal
        category={categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onDeleteSuccess={() => navigate('/dashboard/laboratories')}
      />

      <Button
        size="sm"
        onClick={() => setCategoryToDelete(category)}
        variant="destructive"
      >
        <Trash2 className="size-4" />
        {label}
      </Button>
    </>
  );
}
