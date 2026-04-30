import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateGift } from '../model/useCreateGift';
import { MedicineSelector } from '@/entities/medicine';
import { GiftForm, GiftModal, type GiftPayload } from '@/entities/gift';

export function CreateGiftForm() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'giftsPage.create',
  });

  return (
    <GiftModal
      title={t('title')}
      description={t('subtitle')}
      hasTrigger
      triggerLabel={t('trigger')}
    >
      <Form />
    </GiftModal>
  );
}

function Form() {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useCreateGift();

  function handleSubmit(payload: GiftPayload) {
    mutate(payload, { onSuccess: () => setFormKey((prev) => prev + 1) });
  }

  return (
    <GiftForm
      key={formKey}
      isPending={isPending}
      MedicineSelector={MedicineSelector}
      onReset={() => setFormKey((prev) => prev + 1)}
      onSubmit={handleSubmit}
    />
  );
}
