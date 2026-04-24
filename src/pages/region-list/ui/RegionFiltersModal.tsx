import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UserRound } from 'lucide-react';

import { CitySelector } from '@/entities/city';
import type { RegionFilters } from '@/entities/region';
import { Input, Field, FieldLabel, FiltersModal } from '@/shared/ui';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: RegionFilters;
  onApply: (filters: RegionFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

export function RegionFiltersModal({
  open,
  onOpenChange,
  defaultValues = {},
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'regionsPage.filters',
  });

  const { register, control, handleSubmit, reset } = useForm<RegionFilters>({
    defaultValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (open) reset(defaultValues);
  }, [defaultValues, reset, open]);

  function onSubmit(values: RegionFilters) {
    const cleaned: RegionFilters = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== '' && v !== undefined),
    );
    onApply(cleaned);
  }

  return (
    <FiltersModal
      open={open}
      onOpenChange={onOpenChange}
      title={t('title')}
      subtitle={t('subtitle')}
      form="region-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <form
        id="region-filters-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4 py-2"
      >
        <Field>
          <FieldLabel htmlFor="filter-name">{t('nameLabel')}</FieldLabel>
          <Input
            id="filter-name"
            placeholder={t('namePlaceholder')}
            autoComplete="off"
            icon={UserRound}
            {...register('name')}
          />
        </Field>

        <Field>
          <FieldLabel asChild>
            <p>{t('cityLabel')}</p>
          </FieldLabel>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <CitySelector
                value={field.value ? +field.value : null}
                onValueChange={field.onChange}
              />
            )}
          />
        </Field>
      </form>
    </FiltersModal>
  );
}
