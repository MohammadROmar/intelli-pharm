import { useTranslation } from 'react-i18next';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { Clock, Cross } from 'lucide-react';

import type { Pharmacy } from '../model/pharmacyTypes';
import { RegionSelector } from '@/entities/region';
import { fRequired, required } from '@/shared/lib';
import {
  Card,
  CardContent,
  CardHeader,
  CardSectionHeader,
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Input,
  Separator,
  SwitchRow,
} from '@/shared/ui';

type Props = { isPending?: boolean };

export function PharmacyDetailsCard({ isPending }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.form',
  });

  const { register, control, getValues } = useFormContext<Pharmacy>();
  const { errors } = useFormState<Pharmacy>({
    name: [
      'name',
      'latitude',
      'is_active',
      'region_id',
      'longitude',
      'opening_time',
      'closing_time',
    ],
  });

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={Cross}
          title={t('pharmacyDetailsTitle')}
          description={t('pharmacyDetailsSubtitle')}
        />
      </CardHeader>
      <CardContent className="space-y-5">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">{t('labelName')}</FieldLabel>
          <Input
            id="name"
            autoComplete="off"
            icon={Cross}
            placeholder={t('placeholderName')}
            aria-invalid={!!errors.name}
            {...register('name', {
              disabled: isPending,
              validate: { required: required() },
            })}
          />
          {errors.name && <FieldError>{t('errors.required')}</FieldError>}
        </Field>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Controller
            name="region_id"
            control={control}
            rules={{ validate: fRequired() }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel asChild>
                  <p>{t('labelRegion')}</p>
                </FieldLabel>
                <RegionSelector
                  isLoading={isPending}
                  invalid={!!errors.region_id}
                  // selected={} TO BE ADDED
                  value={field.value ? +field.value : null}
                  onValueChange={field.onChange}
                />
                {fieldState.invalid && (
                  <FieldError>{t('errors.required')}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <SwitchRow
                id="is_active"
                label={t('labelActive')}
                description={t('descriptionActive')}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>

        <Separator />

        <FieldSet>
          <FieldLegend className="text-muted-foreground mb-3 text-xs font-medium tracking-wider uppercase">
            {t('workingHours')}
          </FieldLegend>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field data-invalid={!!errors.opening_time}>
              <FieldLabel htmlFor="opening_time">
                {t('labelOpeningTime')}
              </FieldLabel>
              <Input
                id="opening_time"
                type="time"
                icon={Clock}
                aria-invalid={!!errors.opening_time}
                {...register('opening_time', {
                  disabled: isPending,
                  validate: { required: required() },
                })}
              />
              {errors.opening_time && (
                <FieldError>{t('errors.required')}</FieldError>
              )}
            </Field>

            <Field data-invalid={!!errors.closing_time}>
              <FieldLabel htmlFor="closing_time">
                {t('labelClosingTime')}
              </FieldLabel>
              <Input
                id="closing_time"
                type="time"
                icon={Clock}
                aria-invalid={!!errors.closing_time}
                {...register('closing_time', {
                  disabled: isPending,
                  required: 'errors.required',
                  validate: (value) => {
                    const start = getValues('opening_time');
                    return value > start || 'errors.endAfterStart';
                  },
                })}
              />
              {errors.closing_time?.message && (
                <FieldError>{t(errors.closing_time.message)}</FieldError>
              )}
            </Field>
          </div>
        </FieldSet>
      </CardContent>
    </Card>
  );
}
