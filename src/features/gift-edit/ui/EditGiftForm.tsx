import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { giftToPayload } from '../lib/utils';
import { useEditGift } from '../model/useEditGift';
import { MedicineSelector } from '@/entities/medicine';
import { GiftForm, GiftModal } from '@/entities/gift';
import type { Gift, GiftPayload } from '@/entities/gift';

type Props = { gift: Gift | null; onClose: () => void };

export function EditGiftForm({ gift, onClose }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'giftsPage.edit',
  });

  return (
    <GiftModal
      title={t('title')}
      description={t('subtitle')}
      open={!!gift}
      setOpen={() => onClose()}
    >
      <Form gift={gift} onClose={onClose} />
    </GiftModal>
  );
}

function Form({ gift, onClose }: Props) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useEditGift(gift?.id || -1);

  function handleSubmit(payload: GiftPayload) {
    mutate(payload, { onSuccess: onClose });
  }

  return (
    <GiftForm
      key={formKey}
      isPending={isPending}
      MedicineSelector={MedicineSelector}
      // selectedMedicine={gift?.medicine}
      onReset={() => setFormKey((prev) => prev + 1)}
      defaultValues={gift ? giftToPayload(gift) : undefined}
      onSubmit={handleSubmit}
    />
  );
}
