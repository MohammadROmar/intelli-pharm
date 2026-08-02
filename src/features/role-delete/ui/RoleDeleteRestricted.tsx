import { useTranslation } from 'react-i18next';

import type { RoleItem } from '@/entities/role';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';

type Props = { role: RoleItem | null; onClose: () => void };

export function RoleDeleteRestricted({ role, onClose }: Props) {
  const { t } = useTranslation('roles', { keyPrefix: 'deleteRestricted' });

  return (
    <Dialog
      open={!!role}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
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
