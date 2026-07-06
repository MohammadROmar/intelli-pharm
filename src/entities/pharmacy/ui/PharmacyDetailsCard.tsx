import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { Clock, Cross } from 'lucide-react';

import { getWeekDays } from '../lib/utils';
import type { PharmacyDetail } from '../model/pharmacyTypes';

import { RegionSelector } from '@/entities/region';
import { BilingualNameFields, fRequired, required } from '@/shared/form';
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
  MultiSelect,
} from '@/shared/ui';

type Props = {
  isPending?: boolean;
  selectedRegion?: { id: number; name: string };
};

export function PharmacyDetailsCard({ isPending, selectedRegion }: Props) {
  const { t } = useTranslation('pharmacies');

  const holidayOptions = useMemo(() => getWeekDays(t), [t]);

  const { register, control, getValues } = useFormContext<PharmacyDetail>();
  const { errors } = useFormState<PharmacyDetail>({
    name: [
      'name.ar',
      'name.en',
      'latitude',
      'is_active',
      'region_id',
      'longitude',
      'opening_time',
      'closing_time',
      'holidays',
    ],
  });

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={Cross}
          title={t('form.pharmacyDetailsTitle')}
          description={t('form.pharmacyDetailsSubtitle')}
        />
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <BilingualNameFields
            icon={Cross}
            disabled={isPending}
            placeholderNamespace="pharmacies"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Controller
            name="region_id"
            control={control}
            rules={{ validate: fRequired() }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel asChild>
                  <p>{t('form.labelRegion')}</p>
                </FieldLabel>
                <RegionSelector
                  isLoading={isPending}
                  invalid={!!errors.region_id}
                  selected={selectedRegion}
                  value={field.value ? +field.value : null}
                  onValueChange={field.onChange}
                />
                {fieldState.invalid && (
                  <FieldError>{t('form.errors.required')}</FieldError>
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
                disabled={isPending}
                label={t('form.labelActive')}
                description={t('form.descriptionActive')}
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>

        <Separator />

        <FieldSet>
          <FieldLegend className="text-muted-foreground mb-3 text-xs font-medium tracking-wider uppercase">
            {t('form.workingHours')}
          </FieldLegend>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field data-invalid={!!errors.opening_time}>
              <FieldLabel htmlFor="opening_time">
                {t('form.labelOpeningTime')}
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
                <FieldError>{t('form.errors.required')}</FieldError>
              )}
            </Field>

            <Field data-invalid={!!errors.closing_time}>
              <FieldLabel htmlFor="closing_time">
                {t('form.labelClosingTime')}
              </FieldLabel>
              <Input
                id="closing_time"
                type="time"
                icon={Clock}
                aria-invalid={!!errors.closing_time}
                {...register('closing_time', {
                  disabled: isPending,
                  required: 'form.errors.required',
                  validate: (value) => {
                    const start = getValues('opening_time');
                    return value > start || 'form.errors.endAfterStart';
                  },
                })}
              />
              {errors.closing_time?.message && (
                <FieldError>{t(errors.closing_time.message)}</FieldError>
              )}
            </Field>

            <div className="sm:col-span-2">
              <Controller
                name="holidays"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>{t('form.labelHolidays')}</FieldLabel>
                    <MultiSelect
                      options={holidayOptions}
                      value={field.value || []}
                      onValueChange={field.onChange}
                      disabled={isPending}
                      invalid={fieldState.invalid}
                      placeholder={t('form.holidaysPlaceholder')}
                      emptyText={t('form.noDaysFound')}
                      renderValue={(selected) =>
                        t('form.holidaysSelectedCount', {
                          count: selected.length,
                        })
                      }
                    />
                    {fieldState.error && (
                      <FieldError>{t(fieldState.error.message!)}</FieldError>
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
        </FieldSet>
      </CardContent>
    </Card>
  );
}
