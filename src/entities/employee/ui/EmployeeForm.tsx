import { useMemo } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Lock, Mail, Shield, User } from 'lucide-react';

import { getRoles } from '../lib/getRoles';
import type {
  CreateEmployeeFormData,
  UpdateEmployeeFormData,
  EmployeeInternalFormData,
  BaseEmployeeFormData,
} from '../model/employeeTypes';
import {
  Field,
  FieldError,
  FieldLabel,
  Input,
  GenericSingleSelect,
  FormActions,
  FormSectionHeader,
} from '@/shared/ui';

type CreateProps = {
  mode: 'create';
  onSubmit: SubmitHandler<CreateEmployeeFormData>;
  defaultValues?: never;
  isLoading?: boolean;
  onReset: () => void;
};

type EditProps = {
  mode: 'edit';
  onSubmit: SubmitHandler<UpdateEmployeeFormData>;
  defaultValues: BaseEmployeeFormData;
  isLoading?: boolean;
  onReset: () => void;
};

type EmployeeFormProps = CreateProps | EditProps;

export function EmployeeForm(props: EmployeeFormProps) {
  const { mode, onSubmit, isLoading, onReset } = props;
  const isEdit = mode === 'edit';

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeInternalFormData>({
    defaultValues: isEdit ? props.defaultValues : undefined,
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { t } = useTranslation();
  const roles = useMemo(() => getRoles(t), [t]);

  const handleFormSubmit: SubmitHandler<EmployeeInternalFormData> = (data) => {
    if (mode === 'create') {
      (onSubmit as SubmitHandler<CreateEmployeeFormData>)(
        data as CreateEmployeeFormData,
      );
    } else {
      (onSubmit as SubmitHandler<UpdateEmployeeFormData>)(data);
    }
  };

  return (
    <>
      <FormSectionHeader
        icon={User}
        title={t('employeesPage.detailsTitle')}
        description={t('employeesPage.detailsSubtitle')}
      />

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">{t('form.fields.name')}</FieldLabel>
          <Input
            id="name"
            type="text"
            autoComplete="off"
            icon={User}
            placeholder={t('employeesPage.namePlaceholder')}
            aria-invalid={!!errors.name}
            {...register('name', {
              required: true,
              disabled: isLoading,
              validate: (value) => !!value && value.trim() !== '',
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
            icon={Mail}
            placeholder="example@intellipharm.com"
            aria-invalid={!!errors.email}
            {...register('email', {
              required: true,
              disabled: isLoading,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.email && (
            <FieldError>
              {t('form.errors.invalidField', {
                field: t('form.fields.email'),
              })}
            </FieldError>
          )}
        </Field>

        {!isEdit && (
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">
              {t('form.fields.password')}
            </FieldLabel>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              icon={Lock}
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              {...register('password', {
                required: true,
                disabled: isLoading,
                minLength: 8,
              })}
            />
            {errors.password && (
              <FieldError>{t('form.errors.minLength', { min: 8 })}</FieldError>
            )}
          </Field>
        )}

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
                disabled={isLoading}
                invalid={!!errors.role}
                options={roles}
                valueKey="value"
                labelKey="label"
                icon={Shield}
                value={field.value}
                onValueChange={field.onChange}
                hasMoreLabel={false}
              />
            )}
          />
          {errors.role && <FieldError>{t('form.errors.required')}</FieldError>}
        </Field>

        <FormActions isLoading={isLoading} isEdit={isEdit} onReset={onReset} />
      </form>
    </>
  );
}
