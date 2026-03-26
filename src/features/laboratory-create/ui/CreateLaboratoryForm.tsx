import { useState } from 'react';
import { useCreateLaboratory } from '../model/useCreatelaboratory';
import { LaboratoryForm, type Laboratory } from '@/entities/laboratory';

export function CreateLaboratoryForm() {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useCreateLaboratory();

  function onSubmit(payload: Laboratory) {
    mutate(payload);
  }

  return (
    <LaboratoryForm
      key={formKey}
      onSubmit={onSubmit}
      isLoading={isPending}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
