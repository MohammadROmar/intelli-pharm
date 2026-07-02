import { useState } from 'react';

import { PharmacyForm, type PharmacyDetail } from '@/entities/pharmacy';
import { useCreatePharmacy } from '../model/useCreatePharmacy';

export function PharmacyCreateForm() {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useCreatePharmacy();

  function handleSubmit(payload: PharmacyDetail) {
    mutate(payload, {
      // onSuccess: () => setFormKey((prev) => prev + 1),
    });
  }

  return (
    <PharmacyForm
      key={formKey}
      isPending={isPending}
      onSubmit={handleSubmit}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
