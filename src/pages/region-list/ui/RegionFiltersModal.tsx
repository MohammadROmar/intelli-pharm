import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UserRound } from 'lucide-react';

import { CitySelector } from '@/entities/city';
import { useHasPermission } from '@/entities/session';
import type { RegionFilters } from '@/entities/region';
import {
  Input,
  Field,
  FieldLabel,
  FiltersModal,
  UnavailableField,
} from '@/shared/ui';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: RegionFilters;
  onApply: (filters: RegionFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

type FormProps = {
  defaultValues: RegionFilters;
  onApply: (filters: RegionFilters) => void;
};

const EMPTY_FILTERS: RegionFilters = {};

export function RegionFiltersModal({
  open,
  onOpenChange,
  defaultValues = EMPTY_FILTERS,
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('regions', {
    keyPrefix: 'filters',
  });

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
      <RegionFiltersForm defaultValues={defaultValues} onApply={onApply} />
    </FiltersModal>
  );
}

function RegionFiltersForm({ defaultValues, onApply }: FormProps) {
  const { t } = useTranslation('regions', { keyPrefix: 'filters' });
  const { register, control, handleSubmit } = useForm<RegionFilters>({
    defaultValues,
    mode: 'onSubmit',
  });
  const canFilterByCities = useHasPermission('erp.cities.view');

  function onSubmit(values: RegionFilters) {
    const cleaned: RegionFilters = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== '' && v !== undefined),
    );
    onApply(cleaned);
  }

  return (
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
        {canFilterByCities ? (
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
        ) : (
          <UnavailableField />
        )}
      </Field>
    </form>
  );
}
