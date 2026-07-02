import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from './dialog';
import { Button } from './Button';

type DeleteModalProps = {
  isPending: boolean;
  hasItem: boolean | null;
  label?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export function DeleteModal({
  hasItem,
  label,
  onClose,
  onConfirm,
  isPending,
}: DeleteModalProps) {
  const { t } = useTranslation('common', { keyPrefix: 'dialog.delete' });

  const [stableLabel, setStableLabel] = useState(label);

  if (label && label !== stableLabel) {
    setStableLabel(label);
  }

  return (
    <Dialog
      open={!!hasItem}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title', { item: stableLabel })}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            {t('cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            isLoading={isPending}
            disabled={isPending}
            className="disabled:button-shimmer disabled:[--skeleton-shine:color-mix(in_oklch,var(--destructive),white_45%)] disabled:[--skeleton:var(--destructive)]"
          >
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
