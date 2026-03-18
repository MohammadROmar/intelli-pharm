import { useTranslation } from 'react-i18next';

import { useDeleteCategory } from '../model/useDeleteCategory';
import type { CategoryListItem } from '@/entities/category';
import { DeleteModal } from '@/shared/ui';

interface DeleteCategoryModalProps {
  category: CategoryListItem | null;
  onClose: () => void;
}

export function DeleteCategoryModal({
  category,
  onClose,
}: DeleteCategoryModalProps) {
  const { mutate, isPending } = useDeleteCategory();

  const { t } = useTranslation();

  function handleConfirm() {
    if (!category) return;
    mutate(category.id, {
      onSuccess: () => onClose(),
    });
  }

  return (
    <DeleteModal
      hasItem={!!category}
      label={t('categoriesPage.category')}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
