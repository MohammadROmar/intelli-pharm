import { useState } from 'react';

import { useHasPermission } from '@/entities/session';
import type { Region, RegionDetail } from '@/entities/region';

import { RegionForm } from './RegionForm';
import { useEditRegion } from '../model/useEditRegion';

type Props = { region: RegionDetail };

export function RegionEditForm({ region }: Props) {
  const [formKey, setFormKey] = useState(0);

  const { mutate, isPending } = useEditRegion(region.id);

  function handleSubmit(payload: Region) {
    mutate(payload, {
      onSuccess: () => setFormKey((prev) => prev + 1),
    });
  }

  const canViewCities = useHasPermission('erp.cities.view');

  return (
    <RegionForm
      key={formKey}
      isLoading={isPending}
      onSubmit={handleSubmit}
      canViewCities={canViewCities}
      name={region.name}
      selected={region.city}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
