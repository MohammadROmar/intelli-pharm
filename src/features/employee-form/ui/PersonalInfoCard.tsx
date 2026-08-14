import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Lock, Mail, Smartphone, User } from 'lucide-react';

import type { EmployeeInternalFormData } from '@/entities/employee';
import {
  Card,
  CardContent,
  CardHeader,
  Field,
  FieldError,
  FieldLabel,
  CardSectionHeader,
  Input,
} from '@/shared/ui';

type Props = { isEdit: boolean; isLoading?: boolean };

export function PersonalInfoCard({ isEdit, isLoading }: Props) {
  const { register } = useFormContext<EmployeeInternalFormData>();
  const { errors } = useFormState<EmployeeInternalFormData>({
    name: ['email', 'name', 'password', 'phone_number'],
  });

  const { t } = useTranslation('employees', { keyPrefix: 'form' });
  const { t: tCommon } = useTranslation('common', { keyPrefix: 'form' });

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={User}
          title={t('personalInfoTitle')}
          description={t('personalInfoSubtitle')}
        />
      </CardHeader>

      <CardContent className="space-y-5">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">{t('fields.name')}</FieldLabel>
          <Input
            id="name"
            type="text"
            autoComplete="off"
            icon={User}
            placeholder={t('fields.namePlaceholder')}
            aria-invalid={!!errors.name}
            {...register('name', {
              required: true,
              disabled: isLoading,
              validate: (value) => !!value && value.trim() !== '',
            })}
          />
          {errors.name && <FieldError>{tCommon('errors.required')}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">{t('fields.email')}</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            icon={Mail}
            placeholder="example@intellipharma.com"
            aria-invalid={!!errors.email}
            {...register('email', {
              required: true,
              disabled: isLoading,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.email && (
            <FieldError>
              {tCommon('errors.invalidField', {
                field: t('fields.email'),
              })}
            </FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.phone_number}>
          <FieldLabel htmlFor="phone_number">
            {t('fields.phoneNumber')}
          </FieldLabel>
          <Input
            id="phone_number"
            type="text"
            autoComplete="tel"
            icon={Smartphone}
            placeholder="0987654321"
            aria-invalid={!!errors.phone_number}
            {...register('phone_number', {
              required: true,
              disabled: isLoading,
              pattern: /^09\d{8}$/,
            })}
          />
          {errors.phone_number && (
            <FieldError>
              {tCommon('errors.invalidField', {
                field: t('fields.phoneNumber'),
              })}
            </FieldError>
          )}
        </Field>

        {!isEdit && (
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">{t('fields.password')}</FieldLabel>
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
              <FieldError>{tCommon('errors.minLength', { min: 8 })}</FieldError>
            )}
          </Field>
        )}
      </CardContent>
    </Card>
  );
}
