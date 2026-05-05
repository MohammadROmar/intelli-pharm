import { useState } from 'react';

import { useEditLaboratory } from '../model/useEditLaboratory';
import { LaboratoryForm, type Laboratory } from '@/entities/laboratory';
import type { Localized } from '@/shared/lib';

type Props = { id: number; defaultName: Localized };

export function LaboratoryEditForm({ id, defaultName }: Props) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useEditLaboratory();

  function onSubmit(name: Laboratory) {
    mutate({ id, name });
  }

  return (
    <LaboratoryForm
      key={formKey}
      onSubmit={onSubmit}
      defaultValues={{ name: defaultName }}
      isLoading={isPending}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
