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

type FormProps = {
  defaultValues: CityFilters;
  onApply: (filters: CityFilters) => void;
};

const EMPTY_FILTERS: CityFilters = {};

export function CityFiltersModal({
  open,
  onOpenChange,
  defaultValues = EMPTY_FILTERS,
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('cities', {
    keyPrefix: 'filters',
  });

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
      <CityFiltersForm defaultValues={defaultValues} onApply={onApply} />
    </FiltersModal>
  );
}

function CityFiltersForm({ defaultValues, onApply }: FormProps) {
  const { t } = useTranslation('cities', { keyPrefix: 'filters' });
  const { register, handleSubmit } = useForm<CityFilters>({
    defaultValues,
    mode: 'onSubmit',
  });

  function onSubmit(values: CityFilters) {
    const cleaned: CityFilters = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== '' && v !== undefined),
    );
    onApply(cleaned);
  }

  return (
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
  );
}
