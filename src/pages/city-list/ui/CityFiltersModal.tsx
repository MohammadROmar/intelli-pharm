import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UserRound } from 'lucide-react';

import { Input, Field, FieldLabel, FiltersModal } from '@/shared/ui';

type CityFilters = { name?: string };
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: CityFilters;
  onApply: (filters: CityFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

export function CityFiltersModal({
  open,
  onOpenChange,
  defaultValues = {},
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'citiesPage.filters',
  });

  const { register, handleSubmit, reset } = useForm<CityFilters>({
    defaultValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (open) reset(defaultValues);
  }, [defaultValues, reset, open]);

  function onSubmit(values: CityFilters) {
    const cleaned: CityFilters = Object.fromEntries(
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
      form="city-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <form
        id="city-filters-form"
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
      </form>
    </FiltersModal>
  );
}
