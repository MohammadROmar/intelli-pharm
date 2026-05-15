import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DollarSign, Gift, Package } from 'lucide-react';

import { MedicineSelector } from '@/entities/medicine';
import type { CreateGiftsOfferDto } from '@/entities/offer';
import { required, positiveNumber } from '@/shared/form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardSectionHeader,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FormActions,
  Input,
  SwitchRow,
} from '@/shared/ui';

type FormValues = {
  required_amount: string;
  medicine_id: number | null;
  quantity: string;
  is_active: boolean;
};

function toPayload(values: FormValues): CreateGiftsOfferDto {
  return {
    type: 'gifts',
    required_amount: Number(values.required_amount),
    medicine_id: values.medicine_id!,
    quantity: Number(values.quantity),
    is_active: values.is_active,
  };
}

type Props = {
  onSubmit: (payload: CreateGiftsOfferDto) => void;
  isPending?: boolean;
  onReset: () => void;
};

export function CreateGiftsOfferForm({ onSubmit, isPending, onReset }: Props) {
  const { t } = useTranslation('offers', { keyPrefix: 'form.gifts' });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { is_active: true } });

  function handleFormSubmit(values: FormValues) {
    onSubmit(toPayload(values));
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardSectionHeader
            icon={Gift}
            title={t('cardTitle')}
            description={t('cardSubtitle')}
          />
        </CardHeader>
        <CardContent className="space-y-5">
          <Field data-invalid={!!errors.required_amount}>
            <FieldLabel htmlFor="required_amount">
              {t('labelRequiredAmount')}
            </FieldLabel>
            <Input
              id="required_amount"
              type="number"
              min="0"
              step="0.01"
              icon={DollarSign}
              placeholder="0.00"
              aria-invalid={!!errors.required_amount}
              {...register('required_amount', {
                disabled: isPending,
                validate: {
                  required: required(),
                  positive: positiveNumber(),
                },
              })}
            />
            <FieldDescription className="text-xs">
              {t('hintRequiredAmount')}
            </FieldDescription>
            {errors.required_amount?.message && (
              <FieldError>{t(errors.required_amount.message)}</FieldError>
            )}
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Controller
              name="medicine_id"
              control={control}
              rules={{ validate: required() }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel asChild>
                    <p>{t('labelMedicine')}</p>
                  </FieldLabel>
                  <MedicineSelector
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                    invalid={fieldState.invalid}
                  />
                  {fieldState.error?.message && (
                    <FieldError>{t(fieldState.error.message)}</FieldError>
                  )}
                </Field>
              )}
            />

            <Field data-invalid={!!errors.quantity}>
              <FieldLabel htmlFor="quantity">{t('labelQuantity')}</FieldLabel>
              <Input
                id="quantity"
                type="number"
                min="1"
                step="1"
                icon={Package}
                placeholder="1"
                aria-invalid={!!errors.quantity}
                {...register('quantity', {
                  disabled: isPending,
                  validate: {
                    required: required(),
                    positive: positiveNumber(),
                  },
                })}
              />
              <FieldDescription className="text-xs">
                {t('hintQuantity')}
              </FieldDescription>
              {errors.quantity?.message && (
                <FieldError>{t(errors.quantity.message)}</FieldError>
              )}
            </Field>
          </div>

          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <SwitchRow
                id="is_active"
                label={t('labelActive')}
                description={t('descriptionActive')}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </CardContent>

        <CardFooter>
          <FormActions isEdit={false} isLoading={isPending} onReset={onReset} />
        </CardFooter>
      </Card>
    </form>
  );
}
