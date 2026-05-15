import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { MedicineMetricsFilters } from '../model/medicineMetricsTypes';
import { YearQuarterPicker } from '@/entities/metrics';
import { MedicineSelector } from '@/entities/medicine';
import { Field, FieldLabel, FiltersModal } from '@/shared/ui';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: MedicineMetricsFilters;
  onApply: (filters: MedicineMetricsFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

export function MedicineMetricsFiltersModal({
  open,
  onOpenChange,
  defaultValues = {},
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('metrics', {
    keyPrefix: 'medicine.filters',
  });

  const { control, handleSubmit } = useForm<MedicineMetricsFilters>({
    values: defaultValues,
    mode: 'onSubmit',
  });

  function onSubmit(values: MedicineMetricsFilters) {
    const cleaned = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== '' && v !== undefined),
    ) as MedicineMetricsFilters;

    onApply(cleaned);
  }

  return (
    <FiltersModal
      open={open}
      onOpenChange={onOpenChange}
      title={t('title')}
      subtitle={t('subtitle')}
      form="medicine-metrics-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <form
        id="medicine-metrics-filters-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4 py-2"
      >
        <Controller
          name="medicine_id"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel asChild>
                <p>{t('medicine')}</p>
              </FieldLabel>
              <MedicineSelector
                value={field.value ? +field.value : null}
                onValueChange={field.onChange}
              />
            </Field>
          )}
        />

        <Controller
          name="year"
          control={control}
          render={({ field: yearField }) => (
            <Controller
              name="quarter"
              control={control}
              render={({ field: quarterField }) => (
                <Field>
                  <FieldLabel asChild>
                    <p>{t('period')}</p>
                  </FieldLabel>
                  <YearQuarterPicker
                    year={yearField.value ?? undefined}
                    quarter={quarterField.value ?? undefined}
                    onChange={({ year, quarter }) => {
                      yearField.onChange(year);
                      quarterField.onChange(quarter);
                    }}
                  />
                </Field>
              )}
            />
          )}
        />
      </form>
    </FiltersModal>
  );
}
