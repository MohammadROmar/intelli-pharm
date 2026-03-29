import { useState } from 'react';

import { useCreateMedicine } from '../model/useCreateMedicine';
import { MedicineForm } from '@/features/medicine-form';
import { type ImageFile, type MedicineFormData } from '@/entities/medicine';

export function MedicineCreateForm() {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useCreateMedicine();

  function handleSubmit(payload: {
    values: MedicineFormData;
    images: ImageFile[];
  }) {
    mutate(payload, { onSuccess: () => setFormKey((prev) => prev + 1) });
  }

  return (
    <MedicineForm
      key={formKey}
      isPending={isPending}
      onSubmit={handleSubmit}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
