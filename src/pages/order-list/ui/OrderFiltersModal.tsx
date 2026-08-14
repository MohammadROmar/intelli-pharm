import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { Activity, Calendar, DollarSign } from 'lucide-react';

import type { OrderFilters } from '@/entities/order';
import { useHasPermission } from '@/entities/session';
import { PharmacySelector } from '@/entities/pharmacy';
import {
  Field,
  Input,
  FieldLabel,
  FiltersModal,
  GenericSingleSelect,
  UnavailableField,
} from '@/shared/ui';

import { getStatusesCodes } from '../lib/utils';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: OrderFilters;
  onApply: (filters: OrderFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

export function OrderFiltersModal({
  open,
  onOpenChange,
  defaultValues = {},
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('orders');

  const { register, control, handleSubmit } = useForm<OrderFilters>({
    defaultValues,
    mode: 'onSubmit',
  });

  const statuses = useMemo(() => getStatusesCodes(t), [t]);

  const canFilterByPharmacy = useHasPermission('erp.pharmacies.view');

  function onSubmit(values: OrderFilters) {
    const cleaned: OrderFilters = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== '' && v !== undefined),
    );
    onApply(cleaned);
  }

  return (
    <FiltersModal
      open={open}
      onOpenChange={onOpenChange}
      title={t('filters.title')}
      subtitle={t('filters.subtitle')}
      form="order-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <form
        id="order-filters-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4 py-2"
      >
        <Field>
          <FieldLabel asChild>
            <p>{t('filters.pharmacyLabel')}</p>
          </FieldLabel>

          {canFilterByPharmacy ? (
            <Controller
              name="pharmacy"
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
                <p>{t('filters.statusLabel')}</p>
              </FieldLabel>
              <GenericSingleSelect
                options={statuses}
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

        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="filter-date-from">
              {t('filters.dateFromLabel')}
            </FieldLabel>
            <Input
              id="filter-date-from"
              type="date"
              icon={Calendar}
              {...register('date_from')}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="filter-date-to">
              {t('filters.dateToLabel')}
            </FieldLabel>
            <Input
              id="filter-date-to"
              type="date"
              icon={Calendar}
              {...register('date_to')}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="filter-min-total">
              {t('filters.minTotalLabel')}
            </FieldLabel>
            <Input
              id="filter-min-total"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              icon={DollarSign}
              {...register('min_total')}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="filter-max-total">
              {t('filters.maxTotalLabel')}
            </FieldLabel>
            <Input
              id="filter-max-total"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              icon={DollarSign}
              {...register('max_total')}
            />
          </Field>
        </div>
      </form>
    </FiltersModal>
  );
}
