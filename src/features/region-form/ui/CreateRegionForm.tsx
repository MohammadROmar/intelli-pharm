import { useState } from 'react';

import type { Region } from '@/entities/region';
import { useHasPermission } from '@/entities/session';

import { RegionForm } from './RegionForm';
import { useCreateRegion } from '../model/useCreateRegion';

export function CreateRegionForm() {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useCreateRegion();

  const canViewCities = useHasPermission('erp.cities.view');

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
      canViewCities={canViewCities}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
