import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { Building2 } from 'lucide-react';

import type { City } from '../model/cityTypes';
import { FieldGroup, FormActions } from '@/shared/ui';
import { BilingualNameFields } from '@/shared/form';

type CityFormProps = {
  onSubmit: SubmitHandler<City>;
  defaultValues?: Partial<City>;
  isLoading?: boolean;
  onReset: () => void;
};

export function CityForm({
  onSubmit,
  defaultValues,
  isLoading,
  onReset,
}: CityFormProps) {
  const methods = useForm<City>({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FieldGroup className="flex h-full flex-col justify-between">
          <div className="space-y-5">
            <BilingualNameFields
              icon={Building2}
              disabled={isLoading}
              i18nPrefix="citiesPage.form"
            />
          </div>
          <FormActions
            isLoading={isLoading}
            isEdit={!!defaultValues}
            onReset={onReset}
            classNames={{
              container:
                'lg:justify-center! lg:flex-col-reverse! lg:items-center!',
              reset: 'w-full',
              submit: 'w-full',
            }}
          />
        </FieldGroup>
      </form>
    </FormProvider>
  );
}
