import { CityForm, type City } from '@/entities/city';
import { useEditCity } from '../model/useEditCity';
import { useState } from 'react';

type Props = { id: number; defaultName: string };

export function CityEditForm({ id }: Props) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useEditCity();

  function onSubmit(name: City) {
    mutate({ id, name });
  }

  return (
    <CityForm
      key={formKey}
      onSubmit={onSubmit}
      /* defaultValues={{ name: defaultName }} */
      isLoading={isPending}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
