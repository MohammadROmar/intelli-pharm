import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useHasPermission } from '@/entities/session';
import { PharmacySelector } from '@/entities/pharmacy';
import type { PharmacyFilters } from '@/entities/metrics';
import { FiltersModal, Field, FieldLabel, UnavailableField } from '@/shared/ui';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: PharmacyFilters;
  onApply: (filters: PharmacyFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

type FormProps = {
  defaultValues: PharmacyFilters;
  onApply: (filters: PharmacyFilters) => void;
};

const EMPTY_FILTERS: PharmacyFilters = {};

export function PharmacyFiltersModal({
  open,
  onOpenChange,
  defaultValues = EMPTY_FILTERS,
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'filters.pharmacy' });

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
      <PharmacyFiltersForm defaultValues={defaultValues} onApply={onApply} />
    </FiltersModal>
  );
}

function PharmacyFiltersForm({ defaultValues, onApply }: FormProps) {
  const { t } = useTranslation('metrics', { keyPrefix: 'filters.pharmacy' });
  const { control, handleSubmit } = useForm<PharmacyFilters>({
    defaultValues,
    mode: 'onSubmit',
  });
  const canFilterByPharmacies = useHasPermission('erp.pharmacies.view');
  const pharmacyField = useController({ name: 'pharmacy_id', control });

  function onSubmit(values: PharmacyFilters) {
    const cleaned = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== '' && v !== undefined),
    ) as PharmacyFilters;
    onApply(cleaned);
  }

  return (
    <form
      id="pharmacy-filters-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="py-2"
    >
      <Field>
        <FieldLabel asChild>
          <p>{t('pharmacyLabel')}</p>
        </FieldLabel>
        {canFilterByPharmacies ? (
          <PharmacySelector
            value={
              pharmacyField.field.value ? +pharmacyField.field.value : null
            }
            onValueChange={pharmacyField.field.onChange}
          />
        ) : (
          <UnavailableField />
        )}
      </Field>
    </form>
  );
}
