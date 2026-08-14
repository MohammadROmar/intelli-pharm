import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MedicineSelector } from '@/entities/medicine';
import { useHasPermission } from '@/entities/session';
import {
  GiftForm,
  GiftModal,
  GiftModalTrigger,
  type GiftPayload,
} from '@/entities/gift';

import { useCreateGift } from '../model/useCreateGift';

export function CreateGiftForm() {
  const { t } = useTranslation('gifts', { keyPrefix: 'create' });

  const [open, setOpen] = useState(false);

  return (
    <GiftModal
      title={t('title')}
      description={t('subtitle')}
      open={open}
      setOpen={setOpen}
      trigger={<GiftModalTrigger label={t('trigger')} />}
    >
      <Form onSuccess={() => setOpen(false)} />
    </GiftModal>
  );
}

function Form({ onSuccess }: { onSuccess: () => void }) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useCreateGift();

  const canViewMedicine = useHasPermission('erp.medicines.view');

  function handleSubmit(payload: GiftPayload) {
    mutate(payload, { onSuccess });
  }

  return (
    <GiftForm
      key={formKey}
      isPending={isPending}
      MedicineSelector={MedicineSelector}
      canViewMedicine={canViewMedicine}
      onReset={() => setFormKey((prev) => prev + 1)}
      onSubmit={handleSubmit}
    />
  );
}
