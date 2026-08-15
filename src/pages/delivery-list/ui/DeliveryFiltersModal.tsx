import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Activity, Calendar } from 'lucide-react';

import type { DeliveryFilters, DeliveryStatus } from '@/entities/delivery';
import { PharmacySelector } from '@/entities/pharmacy';
import { useHasPermission } from '@/entities/session';
import {
  Field,
  FieldLabel,
  FiltersModal,
  GenericSingleSelect,
  Input,
  UnavailableField,
} from '@/shared/ui';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: DeliveryFilters;
  onApply: (filters: DeliveryFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

const EMPTY_FILTERS: DeliveryFilters = {};

const DELIVERY_STATUSES = [
  'pending',
  'in_progress',
  'completed',
  'cancelled',
] as const satisfies readonly DeliveryStatus[];

export function DeliveryFiltersModal({
  open,
  onOpenChange,
  defaultValues = EMPTY_FILTERS,
  onApply,
  hasActiveFilters,
  onClear,
}: Props) {
  const { t } = useTranslation('deliveries', { keyPrefix: 'filters' });
  const { t: tStatus } = useTranslation('deliveries', { keyPrefix: 'status' });

  const { control, handleSubmit, register, reset } = useForm<DeliveryFilters>({
    defaultValues,
    mode: 'onSubmit',
  });

  const statusOptions = useMemo(
    () =>
      DELIVERY_STATUSES.map((value) => ({
        value,
        label: tStatus(value),
      })),
    [tStatus],
  );

  const canFilterByPharmacy = useHasPermission('erp.pharmacies.view');

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        reset(defaultValues);
      }
      onOpenChange(nextOpen);
    },
    [defaultValues, onOpenChange, reset],
  );

  return (
    <FiltersModal
      open={open}
      onOpenChange={handleOpenChange}
      title={t('title')}
      subtitle={t('subtitle')}
      form="delivery-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <form
        id="delivery-filters-form"
        onSubmit={handleSubmit(onApply)}
        noValidate
        className="space-y-4 py-2"
      >
        <Field>
          <FieldLabel asChild>
            <p>{t('pharmacyLabel')}</p>
          </FieldLabel>

          {canFilterByPharmacy ? (
            <Controller
              name="pharmacy_id"
              control={control}
              render={({ field }) => (
                <PharmacySelector
                  value={field.value ? Number(field.value) : null}
                  onValueChange={(value) =>
                    field.onChange(value === null ? '' : String(value))
                  }
                />
              )}
            />
          ) : (
            <UnavailableField />
          )}
        </Field>

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel asChild>
                <p>{t('statusLabel')}</p>
              </FieldLabel>
              <GenericSingleSelect
                options={statusOptions}
                valueKey="value"
                labelKey="label"
                icon={Activity}
                value={field.value}
                onValueChange={field.onChange}
                hasMoreLabel={false}
              />
            </Field>
          )}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="filter-scheduled-at-after">
              {t('scheduledAtAfterLabel')}
            </FieldLabel>
            <Input
              id="filter-scheduled-at-after"
              type="date"
              icon={Calendar}
              {...register('scheduled_at_after')}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="filter-scheduled-at-before">
              {t('scheduledAtBeforeLabel')}
            </FieldLabel>
            <Input
              id="filter-scheduled-at-before"
              type="date"
              icon={Calendar}
              {...register('scheduled_at_before')}
            />
          </Field>
        </div>
      </form>
    </FiltersModal>
  );
}
