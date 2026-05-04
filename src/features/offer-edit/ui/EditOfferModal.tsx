import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CardSectionHeader,
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';
import { Tag } from 'lucide-react';

type Props = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;

export function EditOfferModal({ open, onClose, children }: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'offersPage.edit' });

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <div aria-hidden>
            <CardSectionHeader
              title={t('title')}
              description={t('subtitle')}
              icon={Tag}
            />
          </div>
          <DialogTitle className="sr-only">{}</DialogTitle>
          <DialogDescription className="sr-only">{}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
