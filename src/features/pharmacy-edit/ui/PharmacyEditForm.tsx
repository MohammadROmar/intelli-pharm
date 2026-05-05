import { useState } from 'react';

import { useEditPharmacy } from '../model/useEditPharmacy';
import { PharmacyForm, type PharmacyDetail } from '@/entities/pharmacy';

type Props = { pharmacy: PharmacyDetail };

export function PharmacyEditForm({ pharmacy }: Props) {
  const [formKey, setFormKey] = useState(0);

  const { mutate, isPending } = useEditPharmacy(pharmacy.id);

  function handleSubmit(payload: PharmacyDetail) {
    mutate(payload, {
      onSuccess: () => setFormKey((prev) => prev + 1),
    });
  }

  return (
    <PharmacyForm
      key={formKey}
      isPending={isPending}
      onSubmit={handleSubmit}
      defaultValues={pharmacy}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
