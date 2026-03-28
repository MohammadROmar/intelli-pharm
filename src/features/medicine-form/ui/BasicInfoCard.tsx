import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { DollarSign, Pill, StickyNote } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  MedicineSelector,
  useMedicineFieldError,
  type Medicine,
  type MedicineFormData,
} from '@/entities/medicine';
import { CategorySelector } from '@/entities/category';
import { LaboratorySelector } from '@/entities/laboratory';
import { required, fRequired, positiveNumber } from '@/shared/lib';
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
  CardSectionHeader,
  Input,
  Separator,
  SwitchRow,
  Textarea,
} from '@/shared/ui';

type Props = { medicine?: Medicine; isPending?: boolean };

export function BasicInfoCard({ medicine, isPending }: Props) {
  const { register, control } = useFormContext<MedicineFormData>();

  const { errors } = useFormState<MedicineFormData>({
    name: ['name', 'category_id', 'price', 'is_alternative_to_id'],
  });

  const isAlternative = useWatch({ control, name: 'is_alternative' });

  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.form',
  });

  const { te } = useMedicineFieldError('medicinesPage.form');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('basicInfoTitle')}</CardTitle>
        <CardDescription>{t('basicInfoSubtitle')}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <CardSectionHeader
          icon={Pill}
          title={t('medicineDetailsTitle')}
          description={t('medicineDetailsSubtitle')}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name">{t('medicineName')}</FieldLabel>
            <Input
              id="name"
              placeholder={t('medicineNamePlaceholder')}
              aria-invalid={!!errors.name}
              autoComplete="off"
              icon={Pill}
              {...register('name', {
                disabled: isPending,
                validate: { required: required() },
              })}
            />
            <FieldError errors={te(errors.name, 'medicineName')} />
          </Field>

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
          <FieldLabel htmlFor="note">{t('note')}</FieldLabel>
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
                    disabled={isPending}
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
