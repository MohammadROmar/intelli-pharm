import { useState } from 'react';

import { useCreateCity } from '../model/useCreateCity';
import { CityForm, type City } from '@/entities/city';

export function CreateCityForm() {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useCreateCity();

  function onSubmit(payload: City) {
    mutate(payload, { onSuccess: () => setFormKey((prev) => prev + 1) });
  }

  return (
    <CityForm
      key={formKey}
      onSubmit={onSubmit}
      isLoading={isPending}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
