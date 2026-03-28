import { useTranslation } from 'react-i18next';

import { useDeleteCategory } from '../model/useDeleteCategory';
import type { CategoryDetail, CategoryListItem } from '@/entities/category';
import { DeleteModal } from '@/shared/ui';

interface DeleteCategoryModalProps {
  category: CategoryDetail | CategoryListItem | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
}

export function DeleteCategoryModal({
  category,
  onClose,
  onDeleteSuccess,
}: DeleteCategoryModalProps) {
  const { mutate, isPending } = useDeleteCategory();

  const { t } = useTranslation();

  function handleConfirm() {
    if (!category) return;
    mutate(category.id, {
      onSuccess: () => {
        onClose();
        onDeleteSuccess?.();
      },
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
