import { useState } from 'react';

import { EditOfferForm } from './EditOfferForm';
import { EditOfferModal } from './EditOfferModal';
import { useEditOffer } from '../model/useEditOffer';
import type { Offer } from '@/entities/offer';

type EditOfferProps = { offer: Offer | null; onClose: () => void };

export function EditOffer({ offer, onClose }: EditOfferProps) {
  const [formKey, setFormKey] = useState(0);

  const { mutate, isPending } = useEditOffer(offer?.id || -1);

  const defaultValues = offer
    ? { required_amount: offer.required_amount, is_active: offer.is_active }
    : undefined;

  return (
    <EditOfferModal open={!!offer} onClose={onClose}>
      <EditOfferForm
        key={formKey}
        isPending={isPending}
        defaultValues={defaultValues}
        onReset={() => setFormKey((prev) => prev + 1)}
        onSubmit={(payload) => mutate(payload, { onSuccess: onClose })}
      />
    </EditOfferModal>
  );
}
