import type { CategoryDetail, CategoryListItem } from '@/entities/category';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

type DeleteCategoryModalProps = {
  label?: string;
  category: CategoryDetail | CategoryListItem | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
};

export function DeleteCategoryModal({
  label,
  category,
  onClose,
  onDeleteSuccess,
}: DeleteCategoryModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'categories',
    translationKey: 'category',
  });

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
      label={label}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
