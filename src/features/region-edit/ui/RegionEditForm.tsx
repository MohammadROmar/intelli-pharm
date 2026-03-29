import { useState } from 'react';

import { useEditRegion } from '../model/useEditRegion';
import { RegionForm, type Region, type RegionDetail } from '@/entities/region';

type Props = { region: RegionDetail };

export function RegionEditForm({ region }: Props) {
  const [formKey, setFormKey] = useState(0);

  const { mutate, isPending } = useEditRegion(region.id);

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
      defaultValues={region}
      selected={region.city}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
