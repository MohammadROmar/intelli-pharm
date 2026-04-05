import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { FlaskConical } from 'lucide-react';

import type { Laboratory } from '../model/laboratoryTypes';
import { FieldGroup, FormActions } from '@/shared/ui';
import { BilingualNameFields } from '@/shared/form';

type LaboratoryFormProps = {
  onSubmit: SubmitHandler<Laboratory>;
  defaultValues?: Partial<Laboratory>;
  isLoading?: boolean;
  onReset: () => void;
};

export function LaboratoryForm({
  onSubmit,
  defaultValues,
  isLoading,
  onReset,
}: LaboratoryFormProps) {
  const methods = useForm<Laboratory>({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="flex h-full flex-col justify-between gap-5">
          <div className="space-y-5">
            <BilingualNameFields
              icon={FlaskConical}
              disabled={isLoading}
              i18nPrefix="laboratoriesPage.form"
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
