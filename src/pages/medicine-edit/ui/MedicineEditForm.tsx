import { useState } from 'react';

import { useEditMedicine } from '../model/useEditMedicine';
import { MedicineForm } from '@/features/medicine-form';
import type { ImageFile, MedicineFormData } from '@/entities/medicine';

type Props = { id: number; data: MedicineFormData };

export function MedicineEditForm({ id, data }: Props) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useEditMedicine(id);

  function handleSubmit(payload: {
    values: MedicineFormData;
    images: ImageFile[];
  }) {
    mutate(payload, { onSuccess: () => setFormKey((prev) => prev + 1) });
  }

  return (
    <MedicineForm
      key={formKey}
      defaultValues={data}
      isPending={isPending}
      onSubmit={handleSubmit}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
