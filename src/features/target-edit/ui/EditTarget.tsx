import { useState } from 'react';

import { EditTargetForm } from './EditTargetForm';
import { EditTargetModal } from './EditTargetModal';
import { useEditTarget } from '../model/useEditTarget';
import type { Target } from '@/entities/target';

type EditTargetProps = { target: Target | null; onClose: () => void };

function toEditDto(target: Target | null) {
  if (target === null) return undefined;

  return {
    name: target.name,
    value: String(target.value),
    is_active: target.is_active,
  };
}

export function EditTarget({ target, onClose }: EditTargetProps) {
  const [formKey, setFormKey] = useState(0);

  const { mutate, isPending } = useEditTarget(target?.id || -1);

  return (
    <EditTargetModal open={!!target} onClose={onClose}>
      <EditTargetForm
        key={formKey}
        isPending={isPending}
        defaultValues={toEditDto(target)}
        onReset={() => setFormKey((prev) => prev + 1)}
        onSubmit={(payload) => mutate(payload, { onSuccess: onClose })}
      />
    </EditTargetModal>
  );
}
