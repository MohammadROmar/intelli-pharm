import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RegionSelector } from '@/entities/region';
import { CategorySelector } from '@/entities/category';
import { FiltersModal, Field, FieldLabel } from '@/shared/ui';
import { YearQuarterField, type AreaFilters } from '@/entities/metrics';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: AreaFilters;
  onApply: (filters: AreaFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

export function AreaFiltersModal({
  open,
  onOpenChange,
  defaultValues = {},
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'filters.area' });

  const { control, handleSubmit, reset } = useForm<AreaFilters>({
    defaultValues,
    mode: 'onSubmit',
  });

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) reset(defaultValues);
    onOpenChange(nextOpen);
  }

  function onSubmit(values: AreaFilters) {
    const cleaned = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== '' && v !== undefined),
    ) as AreaFilters;
    onApply(cleaned);
  }

  return (
    <FiltersModal
      open={open}
      onOpenChange={handleOpenChange}
      title={t('title')}
      subtitle={t('subtitle')}
      form="area-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <form
        id="area-filters-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4 py-2"
      >
        <YearQuarterField control={control} />

        <Controller
          name="region_id"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel asChild>
                <p>{t('regionLabel')}</p>
              </FieldLabel>
              <RegionSelector
                value={field.value}
                onValueChange={field.onChange}
              />
            </Field>
          )}
        />

        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel asChild>
                <p>{t('categoryLabel')}</p>
              </FieldLabel>
              <CategorySelector
                value={field.value}
                onValueChange={field.onChange}
              />
            </Field>
          )}
        />
      </form>
    </FiltersModal>
  );
}
