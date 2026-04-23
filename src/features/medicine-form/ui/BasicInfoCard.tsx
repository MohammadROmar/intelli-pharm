import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { Dna, DollarSign, Pill, StickyNote } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { MedicineBarcodeScanner } from './MedicineBarcodeScanner';
import {
  MedicineSelector,
  type Medicine,
  type MedicineFormData,
} from '@/entities/medicine';
import { CategorySelector } from '@/entities/category';
import { LaboratorySelector } from '@/entities/laboratory';
import { useFieldError } from '@/shared/lib';
import {
  required,
  fRequired,
  positiveNumber,
  BilingualNameFields,
} from '@/shared/form';
import {
  Card,
  CardContent,
  CardHeader,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  CardSectionHeader,
  Input,
  Separator,
  SwitchRow,
  Textarea,
} from '@/shared/ui';

type Props = { medicine?: Medicine; isPending?: boolean };

export function BasicInfoCard({ medicine, isPending }: Props) {
  'use no memo';

  const { register, control } = useFormContext<MedicineFormData>();

  const { errors } = useFormState<MedicineFormData>({
    name: [
      'name.ar',
      'name.en',
      'scientific_name',
      'category_id',
      'price',
      'is_alternative_to_id',
    ],
  });

  const isAlternative = useWatch({ control, name: 'is_alternative' });

  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.form',
  });

  const { te } = useFieldError('medicinesPage.form');

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={Pill}
          title={t('medicineDetailsTitle')}
          description={t('medicineDetailsSubtitle')}
        />
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <BilingualNameFields
            icon={Pill}
            disabled={isPending}
            i18nPrefix="medicinesPage.form"
          />
        </div>

        <Field data-invalid={!!errors.scientific_name}>
          <FieldLabel htmlFor="scientific_name">
            {t('scientificName')}
          </FieldLabel>
          <Input
            id="scientific_name"
            icon={Dna}
            placeholder={t('placeHolderScientificName')}
            aria-invalid={!!errors.scientific_name}
            {...register('scientific_name', {
              disabled: isPending,
              validate: { required: required() },
            })}
          />
          <FieldError errors={te(errors.scientific_name, 'scientificName')} />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                disabled: isPending,
                validate: {
                  required: required(),
                  positiveNumber: positiveNumber(),
                },
              })}
            />
            <FieldError errors={te(errors.price, 'price')} />
          </Field>
          <MedicineBarcodeScanner />
        </div>

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
                <CategorySelector
                  parent={medicine?.category}
                  isLoading={isPending}
                  invalid={fieldState.invalid}
                  value={field.value}
                  onValueChange={field.onChange}
                />
                <FieldError errors={te(fieldState.error, 'category')} />
              </Field>
            )}
          />

          <Controller
            name="laboratory_id"
            control={control}
            rules={{ validate: required() }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel asChild>
                  <p>{t('laboratory')}</p>
                </FieldLabel>
                <LaboratorySelector
                  selected={medicine?.laboratory ?? undefined}
                  isLoading={isPending}
                  invalid={fieldState.invalid}
                  value={field.value}
                  onValueChange={field.onChange}
                />
                <FieldError errors={te(fieldState.error, 'laboratory')} />
              </Field>
            )}
          />
        </div>

        <Field>
          <FieldLabel htmlFor="note">
            {t('note')}{' '}
            <span className="text-muted-foreground text-xs font-normal">
              ({t('optional')})
            </span>
          </FieldLabel>
          <Textarea
            icon={StickyNote}
            id="note"
            placeholder={t('notePlaceholder')}
            rows={3}
            className="resize-none"
            {...register('note', { disabled: isPending })}
          />
        </Field>

        <Separator className="my-2" />

        <FieldSet>
          <FieldLegend className="text-muted-foreground mb-3 text-xs font-medium tracking-wider uppercase">
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
                    disabled={isPending}
                    label={t(labelKey)}
                    description={t(descKey)}
                    checked={field.value ?? false}
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
                    <MedicineSelector
                      altFor={medicine?.alternative_for[0]}
                      isLoading={isPending}
                      invalid={fieldState.invalid}
                      value={field.value}
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
