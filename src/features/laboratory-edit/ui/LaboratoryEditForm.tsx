import { LaboratoryForm, type Laboratory } from '@/entities/laboratory';
import { useEditLaboratory } from '../model/useEditLaboratory';
import { useState } from 'react';

type Props = { id: number; defaultName: string };

export function LaboratoryEditForm({ id }: Props) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useEditLaboratory();

  function onSubmit(name: Laboratory) {
    mutate({ id, name });
  }

  return (
    <LaboratoryForm
      key={formKey}
      onSubmit={onSubmit}
      defaultValues={{}}
      isLoading={isPending}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
