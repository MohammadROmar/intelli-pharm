import type { ElementType } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Gift, ListChecks } from 'lucide-react';

import type { GiftPayload } from '../model/giftTypes';
import { Field, FieldError, FieldLabel, FormActions, Input } from '@/shared/ui';
import { positiveNumber, required } from '@/shared/form';

type Props = {
  isPending?: boolean;
  onReset: () => void;
  selectedMedicine?: { id: number; commercial_name: string };
  onSubmit: SubmitHandler<GiftPayload>;
  defaultValues?: GiftPayload;
  MedicineSelector: ElementType;
};

export function GiftForm({
  isPending,
  onSubmit,
  onReset,
  defaultValues,
  MedicineSelector,
}: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'giftsPage.form' });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GiftPayload>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Controller
        name="medicine_id"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel asChild>
              <p className="text-sm font-medium">{t('medicine')}</p>
            </FieldLabel>
            <MedicineSelector
              isLoading={isPending}
              invalid={fieldState.invalid}
              value={field.value}
              onValueChange={field.onChange}
            />
            {errors.medicine_id && <FieldError>{t('required')}</FieldError>}
          </Field>
        )}
      />

      <Field data-invalid={!!errors.required_quantity}>
        <FieldLabel htmlFor="required_quantity">
          {t('requiredQuantity')}
        </FieldLabel>
        <Input
          id="required_quantity"
          type="number"
          autoComplete="off"
          icon={ListChecks}
          min="0"
          placeholder="0.00"
          aria-invalid={!!errors.required_quantity}
          {...register('required_quantity', {
            validate: {
              required: required(),
              validNum: positiveNumber(),
            },
            disabled: isPending,
            valueAsNumber: true,
          })}
        />
        {errors.required_quantity?.message && (
          <FieldError>{t(errors.required_quantity?.message)}</FieldError>
        )}
      </Field>

      <Field data-invalid={!!errors.gift_quantity}>
        <FieldLabel htmlFor="gift_quantity">{t('giftQuantity')}</FieldLabel>
        <Input
          id="gift_quantity"
          type="number"
          autoComplete="off"
          icon={Gift}
          min="0"
          placeholder="0.00"
          aria-invalid={!!errors.gift_quantity}
          {...register('gift_quantity', {
            validate: {
              required: required(),
              validNum: positiveNumber(),
            },
            disabled: isPending,
            valueAsNumber: true,
          })}
        />
        {errors.gift_quantity?.message && (
          <FieldError>{t(errors.gift_quantity?.message)}</FieldError>
        )}
      </Field>

      <FormActions
        isEdit={!!defaultValues}
        isLoading={isPending}
        onReset={onReset}
      />
    </form>
  );
}
