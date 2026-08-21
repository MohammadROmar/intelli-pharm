import { FormProvider, useForm } from 'react-hook-form';

import type { PharmacyDetail, PharmacyFormValues } from '@/entities/pharmacy';
import { FormActions } from '@/shared/ui';

import { NotesCard } from './NotesCard';
import { PharmacyDetailsCard } from './PharmacyDetailsCard';
import { LocationPickerCard } from './LocationPickerCard';
import { PharmacistInformationCard } from './PharmacistInformationCard';

type PharmacyFormProps = {
  onSubmit: (payload: PharmacyFormValues) => void;
  defaultValues?: PharmacyDetail;
  isPending?: boolean;
  onReset: () => void;
  canViewRegions: boolean;
};

export function PharmacyForm({
  onSubmit,
  defaultValues,
  isPending,
  onReset,
  canViewRegions,
}: PharmacyFormProps) {
  const isEdit = !!defaultValues;

  const methods = useForm<PharmacyFormValues>({
    defaultValues: {
      is_active: true,
      latitude: 33.5132,
      longitude: 36.2768,
      holidays: [],
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
          canViewRegions={canViewRegions}
          selectedRegion={selectedRegion}
        />
        <PharmacistInformationCard isPending={isPending} />
        <LocationPickerCard isPending={isPending} />
        {!isEdit && <NotesCard isPending={isPending} />}
        <FormActions isEdit={isEdit} isLoading={isPending} onReset={onReset} />
      </form>
    </FormProvider>
  );
}
