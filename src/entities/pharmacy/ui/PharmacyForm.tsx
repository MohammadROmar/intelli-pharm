import { FormProvider, useForm } from 'react-hook-form';

import { PharmacyDetailsCard } from './PharmacyDetailsCard';
import { PharmacistInformationCard } from './PharmacistInformationCard';
import type { Pharmacy } from '../model/pharmacyTypes';
import { FormActions } from '@/shared/ui';

type PharmacyFormProps = {
  onSubmit: (payload: Pharmacy) => void;
  defaultValues?: Pharmacy;
  isPending?: boolean;
  onReset: () => void;
};

export function PharmacyForm({
  onSubmit,
  defaultValues,
  isPending,
  onReset,
}: PharmacyFormProps) {
  const methods = useForm<Pharmacy>({
    defaultValues: {
      is_active: true,
      pharmacist_alt_phone: '',
      latitude: 33.3,
      longitude: 33.3,
      ...defaultValues,
    },
    mode: 'onTouched',
  });

  function handleFormSubmit(data: Pharmacy) {
    onSubmit(data);
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        noValidate
        className="space-y-6"
      >
        <PharmacyDetailsCard isPending={isPending} />
        <PharmacistInformationCard isPending={isPending} />
        <FormActions
          isEdit={!!defaultValues}
          isLoading={isPending}
          onReset={onReset}
        />
      </form>
    </FormProvider>
  );
}
