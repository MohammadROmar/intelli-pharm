import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PharmacySelector } from '@/entities/pharmacy';
import { CategorySelector } from '@/entities/category';
import { FiltersModal, Field, FieldLabel } from '@/shared/ui';
import { YearQuarterPicker, type SeasonalFilters } from '@/entities/metrics';

const DEFAULT_FILTERS: SeasonalFilters = {};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: SeasonalFilters;
  onApply: (filters: SeasonalFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

export function SeasonalFiltersModal({
  open,
  onOpenChange,
  defaultValues = DEFAULT_FILTERS,
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'filters.seasonal' });

  const { control, handleSubmit, reset, getValues, trigger } =
    useForm<SeasonalFilters>({
      defaultValues,
      mode: 'onSubmit',
    });

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) reset(defaultValues);
    onOpenChange(nextOpen);
  }

  const yearField = useController({ name: 'year', control });

  // quarter is required when year is present — backend enforces this
  const quarterField = useController({
    name: 'quarter',
    control,
    rules: {
      validate: (value) => {
        const year = getValues('year');
        if (year && !value) return t('validation.quarterRequired');
        return true;
      },
    },
  });

  const pharmacyField = useController({ name: 'pharmacy_id', control });
  const categoryField = useController({ name: 'category_id', control });

  function onSubmit(values: SeasonalFilters) {
    const cleaned = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== '' && v !== undefined),
    ) as SeasonalFilters;
    onApply(cleaned);
  }

  return (
    <FiltersModal
      open={open}
      onOpenChange={handleOpenChange}
      title={t('title')}
      subtitle={t('subtitle')}
      form="seasonal-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <form
        id="seasonal-filters-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4 py-2"
      >
        <Field>
          <FieldLabel asChild>
            <p>{t('periodLabel')}</p>
          </FieldLabel>
          <YearQuarterPicker
            year={yearField.field.value}
            quarter={quarterField.field.value}
            onChange={({ year, quarter }) => {
              yearField.field.onChange(year);
              quarterField.field.onChange(quarter);
              void trigger('quarter');
            }}
          />
          {quarterField.fieldState.error ? (
            <p className="text-destructive text-xs">
              {quarterField.fieldState.error.message}
            </p>
          ) : null}
        </Field>

        <Field>
          <FieldLabel asChild>
            <p>{t('pharmacyLabel')}</p>
          </FieldLabel>
          <PharmacySelector
            value={
              pharmacyField.field.value ? +pharmacyField.field.value : null
            }
            onValueChange={pharmacyField.field.onChange}
          />
        </Field>

        <Field>
          <FieldLabel asChild>
            <p>{t('categoryLabel')}</p>
          </FieldLabel>
          <CategorySelector
            value={
              categoryField.field.value ? +categoryField.field.value : null
            }
            onValueChange={categoryField.field.onChange}
          />
        </Field>
      </form>
    </FiltersModal>
  );
}
