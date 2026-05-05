import { FormProvider, useForm } from 'react-hook-form';

import { PharmacyDetailsCard } from './PharmacyDetailsCard';
import { LocationPickerCard } from './LocationPickerCard';
import { PharmacistInformationCard } from './PharmacistInformationCard';
import type { PharmacyDetail } from '../model/pharmacyTypes';
import { FormActions } from '@/shared/ui';

type PharmacyFormProps = {
  onSubmit: (payload: PharmacyDetail) => void;
  defaultValues?: PharmacyDetail;
  isPending?: boolean;
  onReset: () => void;
};

export function PharmacyForm({
  onSubmit,
  defaultValues,
  isPending,
  onReset,
}: PharmacyFormProps) {
  const methods = useForm<PharmacyDetail>({
    defaultValues: {
      is_active: true,
      pharmacist_alt_phone: '',
      latitude: 33.5132,
      longitude: 36.2768,
      ...defaultValues,
    },
    mode: 'onTouched',
  });

  const selectedRegion = defaultValues
    ? { id: defaultValues.region_id, name: defaultValues.region }
    : undefined;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
      >
        <PharmacyDetailsCard
          isPending={isPending}
          selectedRegion={selectedRegion}
        />
        <PharmacistInformationCard isPending={isPending} />
        <LocationPickerCard isPending={isPending} />
        <FormActions
          isEdit={!!defaultValues}
          isLoading={isPending}
          onReset={onReset}
        />
      </form>
    </FormProvider>
  );
}
