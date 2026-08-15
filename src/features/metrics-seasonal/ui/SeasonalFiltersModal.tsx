import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PharmacySelector } from '@/entities/pharmacy';
import { CategorySelector } from '@/entities/category';
import { YearQuarterField, type SeasonalFilters } from '@/entities/metrics';
import { FiltersModal, Field, FieldLabel, UnavailableField } from '@/shared/ui';

import { useSeasonalFiltersAccess } from '../model/useSeasonalFiltersAccess';

const DEFAULT_FILTERS: SeasonalFilters = {};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: SeasonalFilters;
  onApply: (filters: SeasonalFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

type FormProps = {
  defaultValues: SeasonalFilters;
  onApply: (filters: SeasonalFilters) => void;
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

  return (
    <FiltersModal
      open={open}
      onOpenChange={onOpenChange}
      title={t('title')}
      subtitle={t('subtitle')}
      form="seasonal-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <SeasonalFiltersForm defaultValues={defaultValues} onApply={onApply} />
    </FiltersModal>
  );
}

function SeasonalFiltersForm({ defaultValues, onApply }: FormProps) {
  const { t } = useTranslation('metrics', { keyPrefix: 'filters.seasonal' });
  const { control, handleSubmit } = useForm<SeasonalFilters>({
    defaultValues,
    mode: 'onSubmit',
  });
  const { canFilterByCategories, canFilterByPharmacies } =
    useSeasonalFiltersAccess();

  function onSubmit(values: SeasonalFilters) {
    const cleaned = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== '' && v !== undefined),
    ) as SeasonalFilters;
    onApply(cleaned);
  }

  return (
    <form
      id="seasonal-filters-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 py-2"
    >
      <YearQuarterField control={control} />

      <Field>
        <FieldLabel asChild>
          <p>{t('pharmacyLabel')}</p>
        </FieldLabel>
        {canFilterByPharmacies ? (
          <Controller
            name="pharmacy_id"
            control={control}
            render={({ field }) => (
              <PharmacySelector
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        ) : (
          <UnavailableField />
        )}
      </Field>

      <Field>
        <FieldLabel asChild>
          <p>{t('categoryLabel')}</p>
        </FieldLabel>
        {canFilterByCategories ? (
          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <CategorySelector
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        ) : (
          <UnavailableField />
        )}
      </Field>
    </form>
  );
}
