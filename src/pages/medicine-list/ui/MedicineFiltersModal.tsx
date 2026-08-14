import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Dna, DollarSign, Pill, Tag } from 'lucide-react';

import { useHasPermission } from '@/entities/session';
import { CategorySelector } from '@/entities/category';
import { MedicineSelector, type MedicineFilters } from '@/entities/medicine';
import {
  Input,
  Separator,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  SwitchRow,
  FiltersModal,
  UnavailableField,
} from '@/shared/ui';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: MedicineFilters;
  onApply: (filters: MedicineFilters) => void;
  onClear: () => void;
  hasActiveFilters?: boolean;
};

export function MedicineFiltersModal({
  open,
  onOpenChange,
  defaultValues = {},
  onApply,
  onClear,
  hasActiveFilters,
}: Props) {
  const { t } = useTranslation('medicines', { keyPrefix: 'filters' });

  const { register, control, handleSubmit } = useForm<MedicineFilters>({
    defaultValues,
    mode: 'onSubmit',
  });

  const canFilterByCategory = useHasPermission('erp.categories.view');

  function onSubmit(values: MedicineFilters) {
    const cleaned = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== '' && v !== undefined),
    ) as MedicineFilters;
    onApply(cleaned);
  }

  return (
    <FiltersModal
      open={open}
      onOpenChange={onOpenChange}
      form="medicine-filters-form"
      onClear={onClear}
      title={t('title')}
      subtitle={t('subtitle')}
      hasActiveFilters={hasActiveFilters}
      className="flex max-h-[90vh] flex-col sm:max-w-lg!"
    >
      <form
        id="medicine-filters-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex-1 space-y-4 py-2 pr-1"
      >
        <FieldSet>
          <FieldLegend className="text-muted-foreground mb-3 text-[11px] font-medium tracking-wider uppercase">
            {t('sectionSearch')}
          </FieldLegend>
          <FieldGroup className="gap-3!">
            <Field>
              <FieldLabel htmlFor="f-name">{t('nameLabel')}</FieldLabel>
              <Input
                id="f-name"
                placeholder={t('namePlaceholder')}
                autoComplete="off"
                icon={Pill}
                {...register('name')}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="f-scientific-name">
                {t('scientificNameLabel')}
              </FieldLabel>
              <Input
                id="f-scientific-name"
                placeholder={t('scientificNamePlaceholder')}
                autoComplete="off"
                icon={Dna}
                {...register('scientific_name')}
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Separator />

        <FieldSet>
          <FieldLegend className="text-muted-foreground mb-3 text-[11px] font-medium tracking-wider uppercase">
            {t('sectionPrice')}
          </FieldLegend>
          <FieldGroup className="grid grid-cols-2 gap-2!">
            <Field>
              <FieldLabel htmlFor="f-min-price">
                {t('minPriceLabel')}
              </FieldLabel>
              <Input
                id="f-min-price"
                type="number"
                min="0"
                icon={DollarSign}
                step="0.01"
                placeholder="0.00"
                {...register('min_price')}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="f-max-price">
                {t('maxPriceLabel')}
              </FieldLabel>
              <Input
                id="f-max-price"
                type="number"
                min="0"
                icon={DollarSign}
                step="0.01"
                placeholder="0.00"
                {...register('max_price')}
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Separator />

        <FieldSet>
          <FieldLegend className="text-muted-foreground text-[11px] font-medium tracking-wider uppercase">
            {t('sectionClassification')}
          </FieldLegend>
          <FieldGroup className="gap-3!">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel asChild>
                    <p>
                      <Tag className="text-muted-foreground mr-1.5 inline-block h-3.5 w-3.5 align-middle" />
                      {t('categoryLabel')}
                    </p>
                  </FieldLabel>
                  {canFilterByCategory ? (
                    <CategorySelector
                      value={field.value ? +field.value : null}
                      onValueChange={field.onChange}
                    />
                  ) : (
                    <UnavailableField />
                  )}
                </Field>
              )}
            />

            <Controller
              name="alternative_for"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel asChild>
                    <p>
                      <Pill className="text-muted-foreground mr-1.5 inline-block h-3.5 w-3.5 align-middle" />
                      {t('alternativeForLabel')}
                    </p>
                  </FieldLabel>
                  <MedicineSelector
                    value={field.value ? +field.value : null}
                    onValueChange={field.onChange}
                  />
                  <FieldDescription className="text-xs">
                    {t('alternativeForHint')}
                  </FieldDescription>
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>

        <Separator />

        <FieldSet>
          <FieldLegend className="text-muted-foreground mb-3 text-[11px] font-medium tracking-wider uppercase">
            {t('sectionFlags')}
          </FieldLegend>
          <FieldGroup className="gap-3!">
            {(
              [
                ['active', 'activeLabel'],
                ['imported', 'importedLabel'],
              ] as const
            ).map(([name, labelKey]) => (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field }) => (
                  <SwitchRow
                    id={name}
                    label={t(labelKey)}
                    checked={field.value === '1'}
                    onCheckedChange={(newValue) =>
                      field.onChange(newValue ? '1' : '0')
                    }
                  />
                )}
              />
            ))}
          </FieldGroup>
        </FieldSet>
      </form>
    </FiltersModal>
  );
}
