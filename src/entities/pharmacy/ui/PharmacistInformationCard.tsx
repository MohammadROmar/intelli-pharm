import { useTranslation } from 'react-i18next';
import { useFormContext, useFormState } from 'react-hook-form';
import { Phone, User } from 'lucide-react';

import type { Pharmacy } from '../model/pharmacyTypes';
import { isValidPhone, required } from '@/shared/lib';
import {
  Card,
  CardContent,
  CardHeader,
  CardSectionHeader,
  Field,
  FieldError,
  FieldLabel,
  Input,
} from '@/shared/ui';

type Props = { isPending?: boolean };

export function PharmacistInformationCard({ isPending }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.form',
  });

  const { register } = useFormContext<Pharmacy>();
  const { errors } = useFormState<Pharmacy>({
    name: ['pharmacist_name', 'pharmacist_phone', 'pharmacist_alt_phone'],
  });

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={User}
          title={t('pharmacistDetailsTitle')}
          description={t('pharmacistDetailsSubtitle')}
        />
      </CardHeader>
      <CardContent className="space-y-5">
        <Field data-invalid={!!errors.pharmacist_name}>
          <FieldLabel htmlFor="pharmacist_name">
            {t('labelPharmacistName')}
          </FieldLabel>
          <Input
            id="pharmacist_name"
            autoComplete="off"
            icon={User}
            placeholder={t('placeholderPharmacistName')}
            aria-invalid={!!errors.pharmacist_name}
            {...register('pharmacist_name', {
              required: true,
              disabled: isPending,
            })}
          />
          {errors.pharmacist_name && (
            <FieldError>{t('errors.required')}</FieldError>
          )}
        </Field>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.pharmacist_phone}>
            <FieldLabel htmlFor="pharmacist_phone">
              {t('labelPhone')}
            </FieldLabel>
            <Input
              id="pharmacist_phone"
              type="tel"
              icon={Phone}
              placeholder="0911223344"
              aria-invalid={!!errors.pharmacist_phone}
              {...register('pharmacist_phone', {
                disabled: isPending,
                validate: {
                  required: required(),
                  validPhone: isValidPhone(),
                },
              })}
            />
            {errors.pharmacist_phone?.message && (
              <FieldError>
                {t(`errors.${errors.pharmacist_phone?.message}`)}
              </FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.pharmacist_alt_phone}>
            <FieldLabel htmlFor="pharmacist_alt_phone">
              {t('labelAltPhone')}{' '}
              <span className="text-muted-foreground text-xs font-normal">
                ({t('optional')})
              </span>
            </FieldLabel>
            <Input
              id="pharmacist_alt_phone"
              type="tel"
              icon={Phone}
              placeholder="0999887766"
              aria-invalid={!!errors.pharmacist_alt_phone}
              {...register('pharmacist_alt_phone', {
                disabled: isPending,
                validate: {
                  validPhone: (v) =>
                    !v ||
                    !v.trim() ||
                    isValidPhone()(v) === true ||
                    'errors.invalidPhone',
                },
              })}
            />
            {errors.pharmacist_alt_phone?.message && (
              <FieldError>{t(errors.pharmacist_alt_phone?.message)}</FieldError>
            )}
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}
