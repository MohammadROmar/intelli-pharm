import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useHasPermission } from '@/entities/session';
import { PharmacySelector } from '@/entities/pharmacy';
import { FiltersModal, Field, FieldLabel, UnavailableField } from '@/shared/ui';
import type { PharmacyFilters } from '@/entities/metrics';

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
  const { t } = useTranslation('metrics', { keyPrefix: 'filters.pharmacy' });

  const { control, handleSubmit, reset } = useForm<PharmacyFilters>({
    defaultValues,
    mode: 'onSubmit',
  });

  const canFilterByPharmacies = useHasPermission('erp.pharmacies.view');

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) reset(defaultValues);
    onOpenChange(nextOpen);
  }

  const pharmacyField = useController({ name: 'pharmacy_id', control });

  function onSubmit(values: PharmacyFilters) {
    const cleaned = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== '' && v !== undefined),
    ) as PharmacyFilters;
    onApply(cleaned);
  }

  return (
    <FiltersModal
      open={open}
      onOpenChange={handleOpenChange}
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
    </FiltersModal>
  );
}
