import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CalendarDays, CheckCircle2 } from 'lucide-react';

import type { PlanFilters } from '@/entities/plan';
import { useHasPermission } from '@/entities/session';
import { EmployeeSelector } from '@/entities/employee';
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
  defaultValues?: PlanFilters;
  onApply: (filters: PlanFilters) => void;
  onClear: () => void;
  hasActiveFilters?: boolean;
};

type FormProps = {
  defaultValues: PlanFilters;
  onApply: (filters: PlanFilters) => void;
};

const EMPTY_FILTERS: PlanFilters = {};

export function PlanFiltersModal({
  open,
  onOpenChange,
  defaultValues = EMPTY_FILTERS,
  onApply,
  onClear,
  hasActiveFilters,
}: Props) {
  const { t } = useTranslation('plan', { keyPrefix: 'list.filters' });
  return (
    <FiltersModal
      open={open}
      onOpenChange={onOpenChange}
      form="plan-filters-form"
      onClear={onClear}
      title={t('title')}
      subtitle={t('subtitle')}
      hasActiveFilters={hasActiveFilters}
      className="sm:max-w-md!"
    >
      <PlanFiltersForm defaultValues={defaultValues} onApply={onApply} />
    </FiltersModal>
  );
}

function PlanFiltersForm({ defaultValues, onApply }: FormProps) {
  const { t } = useTranslation('plan', { keyPrefix: 'list.filters' });
  const finishedOptions = useMemo(
    () => [
      { value: '1', label: t('finishedOptions.finished') },
      { value: '0', label: t('finishedOptions.notFinished') },
    ],
    [t],
  );
  const { register, control, handleSubmit } = useForm<PlanFilters>({
    defaultValues,
    mode: 'onSubmit',
  });
  const canFilterByEmployees = useHasPermission('erp.employees.view');

  function onSubmit(values: PlanFilters) {
    const cleaned = Object.fromEntries(
      Object.entries(values).filter(
        ([, value]) => value !== '' && value !== undefined,
      ),
    ) as PlanFilters;

    onApply(cleaned);
  }

  return (
    <form
      id="plan-filters-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 py-2 pr-1"
    >
      <Field>
        <FieldLabel asChild>
          <p>{t('userLabel')}</p>
        </FieldLabel>
        {canFilterByEmployees ? (
          <Controller
            control={control}
            name="user_id"
            render={({ field }) => (
              <EmployeeSelector
                value={field.value ? +field.value : null}
                onValueChange={field.onChange}
              />
            )}
          />
        ) : (
          <UnavailableField />
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="plan-date">{t('dateLabel')}</FieldLabel>
        <Input
          id="plan-date"
          type="date"
          icon={CalendarDays}
          {...register('date')}
        />
      </Field>

      <Controller
        control={control}
        name="finished"
        render={({ field }) => (
          <Field>
            <FieldLabel>{t('finishedLabel')}</FieldLabel>
            <GenericSingleSelect
              options={finishedOptions}
              valueKey="value"
              labelKey="label"
              icon={CheckCircle2}
              value={field.value}
              onValueChange={field.onChange}
              hasMoreLabel={false}
            />
          </Field>
        )}
      />
    </form>
  );
}
