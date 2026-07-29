import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { DeleteCategoryModal } from '@/features/category-delete';
import type { CategoryDetail } from '@/entities/category';
import { getLocalized } from '@/shared/lib';
import { DropdownMenuItem, PageHeader, ActionsDropdown } from '@/shared/ui';

type Props = { category: CategoryDetail };

export function CategoryDetailHeader({ category }: Props) {
  const { t, i18n } = useTranslation('categories', {
    keyPrefix: 'detail',
  });

  const name = getLocalized(category.name, i18n.language);

  return (
    <PageHeader
      title={name}
      pageTitle={`${name} · ${t('pageTitle')} - IntelliPharma`}
    >
      <CategoryActions category={category} name={name} />
    </PageHeader>
  );
}

function CategoryActions({ category, name }: Props & { name: string }) {
  const { t } = useTranslation('categories', {
    keyPrefix: 'detail',
  });

  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryDetail | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <DeleteCategoryModal
        label={name}
        category={categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onDeleteSuccess={() => navigate('/dashboard/categories')}
      />

      <ActionsDropdown label={t('actions')}>
        <DropdownMenuItem asChild>
          <Link
            to={`/dashboard/categories/${category.id}/edit`}
            className="cursor-pointer"
          >
            <Pencil className="size-4" />
            {t('edit')}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          onClick={() => setCategoryToDelete(category)}
          className="text-destructive hover:text-destructive hover:bg-destructive/20 w-full justify-start"
        >
          <Trash2 className="size-4" />
          {t('delete')}
        </DropdownMenuItem>
      </ActionsDropdown>
    </>
  );
}
