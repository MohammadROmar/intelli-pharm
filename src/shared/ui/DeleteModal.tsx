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

const DESTRUCTIVE_LOADING_CLASSES =
  'disabled:button-shimmer disabled:[--skeleton-shine:color-mix(in_oklch,var(--destructive),white_45%)] disabled:[--skeleton:var(--destructive)]';

export function DeleteModal({
  isPending,
  hasItem,
  label,
  onConfirm,
  onClose,
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
        if (!open && !isPending) onClose();
      }}
    >
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
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
            className={DESTRUCTIVE_LOADING_CLASSES}
          >
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
