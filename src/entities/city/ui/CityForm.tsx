import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pipette } from 'lucide-react';

import type { City } from '../model/cityTypes';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  FormActions,
} from '@/shared/ui';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<City>({ defaultValues });

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="flex h-full flex-col justify-between">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">{t('form.fields.name')}</FieldLabel>
          <Input
            id="name"
            type="text"
            autoComplete="off"
            icon={Pipette}
            placeholder={t('citiesPage.cityNamePlaceholder')}
            {...register('name', {
              required: true,
              disabled: isLoading,
              validate: (value) => value && value.trim() !== '',
            })}
          />
          {errors.name && <FieldError>{t('form.errors.required')}</FieldError>}
        </Field>
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
  );
}
