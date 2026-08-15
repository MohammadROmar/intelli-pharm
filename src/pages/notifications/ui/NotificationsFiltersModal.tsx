import { useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  FiltersModal,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/shared/ui';
import type { FiltersModalProps } from '@/shared/ui';

import { hasInvalidNotificationDateRange } from '../lib/notificationDateFilters';
import type { NotificationsFilters } from '../model/notificationsTypes';

type DateFilterFormValues = { from_date: string; to_date: string };

type FormProps = {
  defaultValues: Partial<NotificationsFilters>;
  onApply: (filters: Partial<NotificationsFilters>) => void;
};

const FORM_ID = 'notifications-filters-form';
const EMPTY_FILTERS: Partial<NotificationsFilters> = {};

function getDateFilterFormValues(
  filters: Partial<NotificationsFilters>,
): DateFilterFormValues {
  return {
    from_date: filters.from_date ?? '',
    to_date: filters.to_date ?? '',
  };
}

export function NotificationsFiltersModal({
  open,
  onOpenChange,
  defaultValues = EMPTY_FILTERS,
  hasActiveFilters,
  onApply,
  onClear,
}: FiltersModalProps<Partial<NotificationsFilters>>) {
  const { t } = useTranslation('notifications', { keyPrefix: 'filters' });

  return (
    <FiltersModal
      open={open}
      onOpenChange={onOpenChange}
      onClear={onClear}
      hasActiveFilters={hasActiveFilters}
      title={t('title')}
      subtitle={t('description')}
      form={FORM_ID}
    >
      <NotificationsFiltersForm
        defaultValues={defaultValues}
        onApply={onApply}
      />
    </FiltersModal>
  );
}

function NotificationsFiltersForm({ defaultValues, onApply }: FormProps) {
  const { t } = useTranslation('notifications', { keyPrefix: 'filters' });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<DateFilterFormValues>({
    defaultValues: getDateFilterFormValues(defaultValues),
    mode: 'onTouched',
  });
  const fromDate = useWatch({ control, name: 'from_date' });
  const toDate = useWatch({ control, name: 'to_date' });
  const hasInvalidRange = hasInvalidNotificationDateRange(fromDate, toDate);
  const rangeError = hasInvalidRange
    ? t('validation.invalidRange')
    : errors.to_date?.message;

  const validateDateRange = useCallback(
    (_value: string, values: DateFilterFormValues) =>
      !hasInvalidNotificationDateRange(
        values.from_date || undefined,
        values.to_date || undefined,
      ) || t('validation.invalidRange'),
    [t],
  );

  const submitDateFilters = useCallback(
    (values: DateFilterFormValues) => {
      const nextFilters: Partial<NotificationsFilters> = { ...defaultValues };

      if (values.from_date) {
        nextFilters.from_date = values.from_date;
      } else {
        delete nextFilters.from_date;
      }

      if (values.to_date) {
        nextFilters.to_date = values.to_date;
      } else {
        delete nextFilters.to_date;
      }

      onApply(nextFilters);
    },
    [defaultValues, onApply],
  );

  return (
    <form
      id={FORM_ID}
      noValidate
      onSubmit={handleSubmit(submitDateFilters)}
      className="space-y-2 py-4"
    >
      <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="notifications-from-date">
            {t('fromDate')}
          </FieldLabel>
          <Input
            id="notifications-from-date"
            type="date"
            max={toDate || undefined}
            aria-invalid={hasInvalidRange}
            aria-describedby={
              rangeError ? 'notifications-date-range-error' : undefined
            }
            {...register('from_date')}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="notifications-to-date">{t('toDate')}</FieldLabel>
          <Input
            id="notifications-to-date"
            type="date"
            min={fromDate || undefined}
            aria-invalid={hasInvalidRange}
            aria-describedby={
              rangeError ? 'notifications-date-range-error' : undefined
            }
            {...register('to_date', { validate: validateDateRange })}
          />
        </Field>
      </FieldGroup>

      {rangeError && (
        <p
          id="notifications-date-range-error"
          role="alert"
          className="text-destructive text-sm"
        >
          {rangeError}
        </p>
      )}
    </form>
  );
}
