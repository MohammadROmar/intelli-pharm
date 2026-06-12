import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, UserRound } from 'lucide-react';

import type { EmployeeFilters } from '@/entities/employee';
import {
  Input,
  Field,
  FieldLabel,
  FiltersModal,
  FieldError,
} from '@/shared/ui';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: EmployeeFilters;
  onApply: (filters: EmployeeFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

export function EmployeeFiltersModal({
  open,
  onOpenChange,
  defaultValues = {},
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('employees', {
    keyPrefix: 'filters',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFilters>({
    defaultValues,
    mode: 'onSubmit',
  });

  function onSubmit(values: EmployeeFilters) {
    const cleaned: EmployeeFilters = Object.fromEntries(
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
      form="employee-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <form
        id="employee-filters-form"
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

        <Field>
          <FieldLabel htmlFor="filter-email">{t('emailLabel')}</FieldLabel>
          <Input
            id="filter-email"
            placeholder={t('emailPlaceholder')}
            autoComplete="off"
            icon={Mail}
            {...register('email')}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="filter-phone">{t('phoneLabel')}</FieldLabel>
          <Input
            id="filter-phone"
            placeholder={t('phonePlaceholder')}
            autoComplete="off"
            icon={Phone}
            {...register('phone', {
              pattern: {
                value: /^[0-9]+$/,
                message: t('phoneError'),
              },
            })}
          />
          {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
        </Field>
      </form>
    </FiltersModal>
  );
}
