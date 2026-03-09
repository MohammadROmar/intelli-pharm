import { useTranslation } from 'react-i18next';

import { useDeleteCategory } from '../model/useDeleteCategory';
import type { CategoryListItem } from '@/entities/category';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from '@/shared/ui';

interface DeleteCategoryModalProps {
  category: CategoryListItem | null;
  onClose: () => void;
}

export const DeleteCategoryModal = ({
  category,
  onClose,
}: DeleteCategoryModalProps) => {
  const { mutate, isPending } = useDeleteCategory();

  const { t } = useTranslation();

  function handleConfirm() {
    if (!category) return;
    mutate(category.id, {
      onSuccess: () => onClose(),
    });
  }

  return (
    <Dialog
      open={!!category}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('dialog.delete.title', { item: t('categoriesPage.category') })}
          </DialogTitle>
          <DialogDescription>
            {t('dialog.delete.description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            {t('dialog.delete.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {t('dialog.delete.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
