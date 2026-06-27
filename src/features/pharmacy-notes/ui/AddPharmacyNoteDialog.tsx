import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, StickyNote } from 'lucide-react';

import { CreatePharmacyNoteForm } from './CreatePharmacyNoteForm';
import {
  Button,
  CardSectionHeader,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
} from '@/shared/ui';

type Props = {
  pharmacyId: number;
} & (
  | { open: boolean; onOpenChange: (open: boolean) => void; trigger?: never }
  | { open?: never; onOpenChange?: never; trigger?: React.ReactNode }
);

export const AddPharmacyNoteDialog = ({
  pharmacyId,
  trigger,
  open: controlledOpen,
  onOpenChange,
}: Props) => {
  const { t } = useTranslation('pharmacies', { keyPrefix: 'notes.dialog' });

  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          {trigger ?? (
            <Button size="sm">
              <Plus className="me-2 size-4" />
              {t('trigger')}
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="p-0!"
      >
        <DialogHeader className="p-6! pb-0! text-start">
          <div aria-hidden>
            <CardSectionHeader
              title={t('title')}
              description={t('description')}
              icon={StickyNote}
            />
          </div>
          <DialogTitle className="sr-only">{t('title')}</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="p-6 pt-0">
          <CreatePharmacyNoteForm
            key={String(open)}
            pharmacyId={pharmacyId}
            onSuccess={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
