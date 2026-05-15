import { useState } from 'react';

import { useEditLaboratory } from '../model/useEditLaboratory';
import { LaboratoryForm, type Laboratory } from '@/entities/laboratory';
import type { Localized } from '@/shared/lib';

type Props = { id: number; defaultName: Localized; onSuccess: () => void };

export function LaboratoryEditForm({ id, defaultName, onSuccess }: Props) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useEditLaboratory();

  function onSubmit(name: Laboratory) {
    mutate({ id, name }, { onSuccess });
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
