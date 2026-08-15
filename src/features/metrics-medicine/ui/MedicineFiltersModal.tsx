import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useHasPermission } from '@/entities/session';
import { MedicineSelector } from '@/entities/medicine';
import { YearQuarterField, type MedicineFilters } from '@/entities/metrics';
import { FiltersModal, Field, FieldLabel, UnavailableField } from '@/shared/ui';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: MedicineFilters;
  onApply: (filters: MedicineFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

type FormProps = {
  defaultValues: MedicineFilters;
  onApply: (filters: MedicineFilters) => void;
};

const EMPTY_FILTERS: MedicineFilters = {};

export function MedicineFiltersModal({
  open,
  onOpenChange,
  defaultValues = EMPTY_FILTERS,
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'filters.medicine' });

  return (
    <FiltersModal
      open={open}
      onOpenChange={onOpenChange}
      title={t('title')}
      subtitle={t('subtitle')}
      form="medicine-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <MedicineFiltersForm defaultValues={defaultValues} onApply={onApply} />
    </FiltersModal>
  );
}

function MedicineFiltersForm({ defaultValues, onApply }: FormProps) {
  'use no memo';
  const { t } = useTranslation('metrics', { keyPrefix: 'filters.medicine' });
  const { control, handleSubmit } = useForm<MedicineFilters>({
    defaultValues,
    mode: 'onSubmit',
  });
  const canFilterByMedicine = useHasPermission('erp.medicines.view');

  function onSubmit(values: MedicineFilters) {
    const cleaned = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== '' && v !== undefined),
    ) as MedicineFilters;
    onApply(cleaned);
  }

  return (
    <form
      id="medicine-filters-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 py-2"
    >
      <YearQuarterField control={control} />

      <Field>
        <FieldLabel asChild>
          <p>{t('medicineLabel')}</p>
        </FieldLabel>
        {canFilterByMedicine ? (
          <Controller
            name="medicine_id"
            control={control}
            render={({ field }) => (
              <MedicineSelector
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
