import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Tag } from 'lucide-react';

import {
  CardSectionHeader,
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';

type Props = PropsWithChildren<{ open: boolean; onClose: () => void }>;

export function EditOfferModal({ open, onClose, children }: Props) {
  const { t } = useTranslation('offers', { keyPrefix: 'edit' });

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
          <DialogTitle className="sr-only">{t('title')}</DialogTitle>
          <DialogDescription className="sr-only">
            {t('subtitle')}
          </DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
