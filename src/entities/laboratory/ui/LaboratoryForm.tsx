import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pipette } from 'lucide-react';

import type { Laboratory } from '../model/laboratoryTypes';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  FormActions,
} from '@/shared/ui';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Laboratory>({ defaultValues });

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
            placeholder={t('laboratoriesPage.labNamePlaceholder')}
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
