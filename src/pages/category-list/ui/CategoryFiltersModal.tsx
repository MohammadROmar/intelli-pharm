import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UserRound } from 'lucide-react';

import { CategorySelector, type CategoryFilters } from '@/entities/category';
import { Input, Field, FieldLabel, FiltersModal } from '@/shared/ui';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: CategoryFilters;
  onApply: (filters: CategoryFilters) => void;
  hasActiveFilters?: boolean;
  onClear: () => void;
};

export function CategoryFiltersModal({
  open,
  onOpenChange,
  defaultValues = {},
  hasActiveFilters,
  onApply,
  onClear,
}: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'categoriesPage.filters',
  });

  const { register, control, handleSubmit, reset } = useForm<CategoryFilters>({
    defaultValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (open) reset(defaultValues);
  }, [defaultValues, reset, open]);

  function onSubmit(values: CategoryFilters) {
    const cleaned: CategoryFilters = Object.fromEntries(
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
      form="category-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <form
        id="category-filters-form"
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
          <FieldLabel asChild>
            <p>{t('parentLabel')}</p>
          </FieldLabel>
          <Controller
            name="parent_id"
            control={control}
            render={({ field }) => (
              <CategorySelector
                value={field.value ? +field.value : null}
                onValueChange={field.onChange}
              />
            )}
          />
        </Field>
      </form>
    </FiltersModal>
  );
}
