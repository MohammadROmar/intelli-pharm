import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UserRound } from 'lucide-react';

import { type PharmacyFilters } from '@/entities/pharmacy';
import { Input, Field, FieldLabel, FiltersModal } from '@/shared/ui';
import { RegionSelector } from '@/entities/region';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: PharmacyFilters;
  onApply: (filters: PharmacyFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

export function PharmacyFiltersModal({
  open,
  onOpenChange,
  defaultValues = {},
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.filters',
  });

  const { register, handleSubmit, control, reset } = useForm<PharmacyFilters>({
    defaultValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (open) reset(defaultValues);
  }, [defaultValues, reset, open]);

  function onSubmit(values: PharmacyFilters) {
    const cleaned: PharmacyFilters = Object.fromEntries(
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
      form="pharmacy-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <form
        id="pharmacy-filters-form"
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
            className="pl-9"
            icon={UserRound}
            {...register('name')}
          />
        </Field>

        <Controller
          name="region"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel asChild>
                <p>{t('labelRegion')}</p>
              </FieldLabel>
              <RegionSelector
                value={field.value ? +field.value : null}
                onValueChange={field.onChange}
              />
            </Field>
          )}
        />
      </form>
    </FiltersModal>
  );
}
