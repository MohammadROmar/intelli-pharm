import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

import type { RoleFilters } from '@/entities/role';
import { Field, FieldLabel, FiltersModal, Input } from '@/shared/ui';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: RoleFilters;
  onApply: (filters: RoleFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

const EMPTY_FILTERS: RoleFilters = {};

export function RoleFiltersModal({
  open,
  onOpenChange,
  defaultValues = EMPTY_FILTERS,
  onApply,
  hasActiveFilters,
  onClear,
}: Props) {
  const { t } = useTranslation('roles', { keyPrefix: 'filters' });
  const { handleSubmit, register, reset } = useForm<RoleFilters>({
    defaultValues,
    mode: 'onSubmit',
  });

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
      form="role-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <form
        id="role-filters-form"
        onSubmit={handleSubmit(onApply)}
        noValidate
        className="space-y-4 py-2"
      >
        <Field>
          <FieldLabel htmlFor="filter-role-name">{t('nameLabel')}</FieldLabel>
          <Input
            id="filter-role-name"
            type="search"
            icon={Search}
            placeholder={t('namePlaceholder')}
            {...register('name')}
          />
        </Field>
      </form>
    </FiltersModal>
  );
}
