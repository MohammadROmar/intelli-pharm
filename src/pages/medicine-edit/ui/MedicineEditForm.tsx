import { useState } from 'react';

import { useEditMedicine } from '../model/useEditMedicine';
import { MedicineForm } from '@/features/medicine-form';
import type {
  ImageFile,
  Medicine,
  MedicineFormData,
} from '@/entities/medicine';

type Props = { id: number; medicine: Medicine };

export function MedicineEditForm({ id, medicine }: Props) {
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
      medicine={medicine}
      isPending={isPending}
      onSubmit={handleSubmit}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
