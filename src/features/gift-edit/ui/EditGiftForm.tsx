import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useHasPermission } from '@/entities/session';
import { MedicineSelector } from '@/entities/medicine';
import { GiftForm, GiftModal } from '@/entities/gift';
import type { Gift, GiftPayload } from '@/entities/gift';
import { getLocalized } from '@/shared/lib';

import { giftToPayload } from '../lib/utils';
import { useEditGift } from '../model/useEditGift';

type Props = { gift: Gift | null; onClose: () => void };

export function EditGiftForm({ gift, onClose }: Props) {
  const { t, i18n } = useTranslation('gifts', { keyPrefix: 'edit' });

  return (
    <GiftModal
      title={t('title')}
      description={t('subtitle')}
      open={!!gift}
      setOpen={() => onClose()}
    >
      <Form gift={gift} onClose={onClose} lang={i18n.language} />
    </GiftModal>
  );
}

function Form({ gift, onClose, lang }: Props & { lang: string }) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useEditGift(gift?.id || -1);

  const canViewMedicine = useHasPermission('erp.medicines.view');

  function handleSubmit(payload: GiftPayload) {
    mutate(payload, { onSuccess: onClose });
  }

  const medicine = gift?.medicine;
  const selectedMedicine = medicine
    ? {
        id: medicine.id,
        commercial_name: getLocalized(medicine.commercial_name, lang),
      }
    : undefined;

  return (
    <GiftForm
      key={formKey}
      isPending={isPending}
      MedicineSelector={MedicineSelector}
      selectedMedicine={selectedMedicine}
      canViewMedicine={canViewMedicine}
      onReset={() => setFormKey((prev) => prev + 1)}
      defaultValues={gift ? giftToPayload(gift) : undefined}
      onSubmit={handleSubmit}
    />
  );
}
