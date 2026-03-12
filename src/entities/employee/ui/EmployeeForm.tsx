import { useMemo } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { Employee, EmployeeFormData } from '../model/employeeTypes';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  GenericSingleSelect,
  FormActions,
} from '@/shared/ui';
import { getRoles } from '../lib/getRoles';

type EmployeeFormProps = {
  onSubmit: SubmitHandler<EmployeeFormData>;
  defaultValues?: Partial<Employee>;
  isLoading?: boolean;
};

export function EmployeeForm({
  onSubmit,
  defaultValues,
  isLoading,
}: EmployeeFormProps) {
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({ defaultValues });

  const { t } = useTranslation();

  const roles = useMemo(() => getRoles(t), [t]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">{t('form.fields.name')}</FieldLabel>
          <Input
            id="name"
            type="text"
            autoComplete="off"
            {...register('name', {
              required: true,
              disabled: isLoading,
              validate: (value) => value && value.trim() !== '',
            })}
          />
          {errors.name && <FieldError>{t('form.errors.required')}</FieldError>}
        </Field>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">{t('form.fields.email')}</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="example@intellipharm.com"
            {...register('email', {
              required: true,
              disabled: isLoading,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.name && (
            <FieldError>
              {t('form.errors.invalidField', {
                field: t('form.fields.email'),
              })}
            </FieldError>
          )}
        </Field>
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">
            {t('form.fields.password')}
          </FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="********"
            {...register('password', {
              required: true,
              disabled: isLoading,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            })}
          />
          {errors.name && (
            <FieldError>
              {t('form.errors.invalidField', {
                field: t('form.fields.password'),
              })}
            </FieldError>
          )}
        </Field>
        <Field data-invalid={!!errors.role}>
          <FieldLabel asChild>
            <p>{t('form.fields.role')}</p>
          </FieldLabel>
          <Controller
            name="role"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <GenericSingleSelect
                options={roles}
                valueKey="value"
                labelKey="label"
                value={field.value}
                onValueChange={field.onChange}
                hasMoreLabel={false}
              />
            )}
          />
          {errors.role && <FieldError>{t('form.errors.required')}</FieldError>}
        </Field>
        <FormActions isLoading={isLoading} onReset={reset} />
      </FieldGroup>
    </form>
  );
}
