import { useTranslation } from 'react-i18next';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';

type Props = { onClose: () => void };

export function RoleDeleteRestricted({ onClose }: Props) {
  const { t } = useTranslation('roles', { keyPrefix: 'deleteRestricted' });

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent onOpenAutoFocus={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('message')}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('action')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
