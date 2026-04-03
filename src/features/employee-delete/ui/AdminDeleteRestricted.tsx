import { useTranslation } from 'react-i18next';

import type { DeleteEmployeeModalProps } from './DeleteEmployeeModal';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';

export function AdminDeleteRestricted({
  employee,
  onClose,
}: DeleteEmployeeModalProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'employeesPage.deleteRestricted',
  });

  return (
    <Dialog
      open={!!employee}
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
