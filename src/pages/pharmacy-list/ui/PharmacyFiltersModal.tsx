import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Phone, User, UserRound } from 'lucide-react';

import { RegionSelector } from '@/entities/region';
import type { PharmacyFilters } from '@/entities/pharmacy';
import { Input, Field, FieldLabel, FiltersModal } from '@/shared/ui';

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
  const { t } = useTranslation('pharmacies', {
    keyPrefix: 'filters',
  });

  const { register, handleSubmit, control } = useForm<PharmacyFilters>({
    defaultValues,
    mode: 'onSubmit',
  });

  function onSubmit(values: PharmacyFilters) {
    const cleaned: PharmacyFilters = Object.fromEntries(
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
      form="pharmacy-filters-form"
      hasActiveFilters={hasActiveFilters}
      onClear={onClear}
    >
      <form
        id="pharmacy-filters-form"
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

        <Controller
          name="region"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel asChild>
                <p>{t('labelRegion')}</p>
              </FieldLabel>
              <RegionSelector
                value={field.value ? +field.value : null}
                onValueChange={field.onChange}
              />
            </Field>
          )}
        />

        <Field>
          <FieldLabel htmlFor="pharmacist_name">
            {t('labelPharmacistName')}
          </FieldLabel>
          <Input
            id="pharmacist_name"
            autoComplete="off"
            icon={User}
            placeholder={t('placeholderPharmacistName')}
            {...register('pharmacist_name')}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="pharmacist_phone">{t('labelPhone')}</FieldLabel>
          <Input
            id="pharmacist_phone"
            type="tel"
            icon={Phone}
            placeholder="0911223344"
            {...register('pharmacist_phone')}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="pharmacist_alt_phone">
            {t('labelAltPhone')}
          </FieldLabel>
          <Input
            id="pharmacist_alt_phone"
            type="tel"
            icon={Phone}
            placeholder="0999887766"
            {...register('pharmacist_alt_phone')}
          />
        </Field>
      </form>
    </FiltersModal>
  );
}
