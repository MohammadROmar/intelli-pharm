import { useState } from 'react';

import { useEditCity } from '../model/useEditCity';
import { CityForm, type City, type CityDetail } from '@/entities/city';

type Props = { city: CityDetail | null };

export function CityEditForm({ city }: Props) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useEditCity();

  function onSubmit(name: City) {
    mutate({ id: city?.id ?? -1, name });
  }

  return (
    <CityForm
      key={formKey}
      onSubmit={onSubmit}
      defaultValues={city ? { name: city.name } : undefined}
      isLoading={isPending}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
