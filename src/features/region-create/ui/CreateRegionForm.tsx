import { useState } from 'react';

import { RegionForm, type Region } from '@/entities/region';
import { useCreateRegion } from '../model/useCreateRegion';

export function CreateRegionForm() {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useCreateRegion();

  function handleSubmit(payload: Region) {
    mutate(payload, {
      onSuccess: () => setFormKey((prev) => prev + 1),
    });
  }

  return (
    <RegionForm
      key={formKey}
      isLoading={isPending}
      onSubmit={handleSubmit}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
