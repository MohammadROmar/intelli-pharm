import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { DollarSign, Pill, StickyNote, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { FormValues } from '../model/medicineTypes';
import { required, fRequired, positiveNumber } from '../utils/utils';
import { useFieldError } from '../model/useFieldError';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FormSectionHeader,
  GenericSingleSelect,
  Input,
  Separator,
  SwitchRow,
  Textarea,
} from '@/shared/ui';

const CATEGORIES = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Smartphones' },
  { id: '3', name: 'Laptops' },
  { id: '4', name: 'Clothing' },
];

const MEDICINES = [
  { id: '1', name: 'Paracetamol 500mg' },
  { id: '2', name: 'Ibuprofen 400mg' },
  { id: '3', name: 'Amoxicillin 250mg' },
];

export function BasicInfoCard() {
  const { register, control } = useFormContext<FormValues>();

  const { errors } = useFormState<FormValues>({
    name: ['name', 'category_id', 'price', 'is_alternative_to_id'],
  });

  const isAlternative = useWatch({ control, name: 'is_alternative' });

  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.form',
  });

  const { te } = useFieldError('medicinesPage.form');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('basicInfoTitle')}</CardTitle>
        <CardDescription>{t('basicInfoSubtitle')}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <FormSectionHeader
          icon={Pill}
          title={t('medicineDetailsTitle')}
          description={t('medicineDetailsSubtitle')}
        />

        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">{t('medicineName')}</FieldLabel>
          <Input
            id="name"
            placeholder={t('medicineNamePlaceholder')}
            aria-invalid={!!errors.name}
            autoComplete="off"
            icon={Pill}
            {...register('name', {
              validate: { required: required() },
            })}
          />
          <FieldError errors={te(errors.name, 'medicineName')} />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="category_id"
            control={control}
            rules={{ validate: fRequired() }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel asChild>
                  <p>{t('category')}</p>
                </FieldLabel>
                <GenericSingleSelect
                  icon={Tag}
                  invalid={fieldState.invalid}
                  options={CATEGORIES}
                  valueKey="id"
                  labelKey="name"
                  value={field.value}
                  onValueChange={field.onChange}
                />
                <FieldError errors={te(fieldState.error, 'category')} />
              </Field>
            )}
          />

          <Field data-invalid={!!errors.price}>
            <FieldLabel htmlFor="price">{t('price')}</FieldLabel>
            <Input
              id="price"
              type="number"
              icon={DollarSign}
              min="0"
              placeholder="0.00"
              aria-invalid={!!errors.price}
              {...register('price', {
                validate: {
                  required: required(),
                  positiveNumber: positiveNumber(),
                },
              })}
            />
            <FieldError errors={te(errors.price, 'price')} />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="note">{t('note')}</FieldLabel>
          <Textarea
            icon={StickyNote}
            id="note"
            placeholder={t('notePlaceholder')}
            rows={3}
            className="resize-none"
            {...register('note')}
          />
        </Field>

        <Separator className="my-2" />

        <FieldSet>
          <FieldLegend className="text-muted-foreground mb-3 text-[11px] font-medium tracking-wider uppercase">
            {t('flags')}
          </FieldLegend>
          <FieldGroup className="space-y-3">
            {(
              [
                ['is_active', 'active', 'activeDescription'],
                ['is_imported', 'imported', 'importedDescription'],
                ['is_alternative', 'alternative', 'alternativeDescription'],
              ] as const
            ).map(([name, labelKey, descKey]) => (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field }) => (
                  <SwitchRow
                    id={name}
                    label={t(labelKey)}
                    description={t(descKey)}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            ))}

            {isAlternative && (
              <Controller
                name="is_alternative_to_id"
                control={control}
                rules={{ validate: required() }}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="border-border bg-muted/30 rounded-lg border px-4 py-3"
                  >
                    <FieldLabel asChild>
                      <p className="text-sm font-medium">
                        {t('alternativeToMedicine')}
                      </p>
                    </FieldLabel>
                    <GenericSingleSelect
                      icon={Pill}
                      invalid={fieldState.invalid}
                      options={MEDICINES}
                      valueKey="id"
                      labelKey="name"
                      value={field.value ?? ''}
                      onValueChange={field.onChange}
                    />
                    <FieldError
                      errors={te(fieldState.error, 'alternativeToMedicine')}
                    />
                  </Field>
                )}
              />
            )}
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
}
