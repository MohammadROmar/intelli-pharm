import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Button } from './Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';

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
  const { t } = useTranslation('translation', { keyPrefix: 'dialog.delete' });

  const [stableLabel, setStableLabel] = useState(label);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (label) setStableLabel(label);
  }, [label]);

  return (
    <Dialog
      open={hasItem ?? undefined}
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
          >
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
