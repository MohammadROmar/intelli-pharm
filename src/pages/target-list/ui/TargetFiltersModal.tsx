import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CalendarDays, CalendarRange } from 'lucide-react';

import type { TargetFilters } from '@/entities/target';
import {
  Field,
  SwitchRow,
  FieldLabel,
  FiltersModal,
  GenericSingleSelect,
} from '@/shared/ui';
import type { TFunction } from 'i18next';

function TYPE_OPTIONS(t: TFunction) {
  return [
    { id: 'monthly', name: t('type.monthly') },
    { id: 'quarterly', name: t('type.quarterly') },
  ];
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: TargetFilters;
  onApply: (filters: TargetFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

export function TargetFiltersModal({
  open,
  onOpenChange,
  defaultValues = {},
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('targets', {
    keyPrefix: 'filters',
  });

  const { control, handleSubmit, reset } = useForm<TargetFilters>({
    defaultValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (open) reset(defaultValues);
  }, [defaultValues, reset, open]);

  function onSubmit(values: TargetFilters) {
    const cleaned: TargetFilters = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== '' && v !== undefined),
    );
    onApply(cleaned);
  }

  const options = useMemo(() => TYPE_OPTIONS(t), [t]);

  return (
    <FiltersModal
      open={open}
      onOpenChange={onOpenChange}
      title={t('title')}
      subtitle={t('subtitle')}
      form="target-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <form
        id="target-filters-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4 py-2"
      >
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel asChild>
                <p>{t('typeLabel')}</p>
              </FieldLabel>
              <GenericSingleSelect
                options={options}
                valueKey="id"
                labelKey="name"
                value={field.value ?? ''}
                onValueChange={field.onChange}
                icon={
                  field.value === 'quarterly' ? CalendarRange : CalendarDays
                }
                hasMoreLabel={false}
              />
            </Field>
          )}
        />

        <Controller
          name="is_active"
          control={control}
          render={({ field }) => (
            <SwitchRow
              id="filter-is-active"
              label={t('isActiveLabel')}
              description={t('isActiveDescription')}
              checked={field.value === '1'}
              onCheckedChange={(v) => field.onChange(v ? '1' : '0')}
            />
          )}
        />
      </form>
    </FiltersModal>
  );
}
