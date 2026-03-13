import { useMemo } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Lock, Mail, Shield, User } from 'lucide-react';

import { getRoles } from '../lib/getRoles';
import type { Employee, EmployeeFormData } from '../model/employeeTypes';
import {
  Field,
  FieldError,
  FieldLabel,
  Input,
  GenericSingleSelect,
  FormActions,
  FormSectionHeader,
} from '@/shared/ui';

type EmployeeFormProps = {
  onSubmit: SubmitHandler<EmployeeFormData>;
  defaultValues?: Partial<Employee>;
  isLoading?: boolean;
  onReset: () => void;
};

export function EmployeeForm({
  onSubmit,
  isLoading,
  onReset,
  defaultValues,
}: EmployeeFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    defaultValues,
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { t } = useTranslation();

  const roles = useMemo(() => getRoles(t), [t]);

  return (
    <>
      <FormSectionHeader
        icon={User}
        title={t('employeesPage.detailsTitle')}
        description={t('employeesPage.detailsSubtitle')}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            icon={Mail}
            aria-invalid={!!errors.email}
            placeholder="example@intellipharm.com"
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
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">
            {t('form.fields.password')}
          </FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            icon={Lock}
            aria-invalid={!!errors.password}
            placeholder="********"
            {...register('password', {
              required: true,
              disabled: isLoading,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            })}
          />
          {errors.password && (
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
        <FormActions isLoading={isLoading} onReset={onReset} />
      </form>
    </>
  );
}
