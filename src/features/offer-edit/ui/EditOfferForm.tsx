import { useTranslation } from 'react-i18next';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Banknote } from 'lucide-react';

import type { EditOfferDto } from '@/entities/offer';
import { positiveNumber, required } from '@/shared/form';
import {
  Field,
  FieldError,
  FieldLabel,
  FormActions,
  Input,
  SwitchRow,
} from '@/shared/ui';

type Props = {
  isPending?: boolean;
  onReset: () => void;
  defaultValues?: EditOfferDto;
  onSubmit: SubmitHandler<EditOfferDto>;
};

export function EditOfferForm({
  isPending,
  onReset,
  defaultValues,
  onSubmit,
}: Props) {
  const { t } = useTranslation('offers', { keyPrefix: 'edit' });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditOfferDto>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field data-invalid={!!errors.required_amount}>
        <FieldLabel htmlFor="required_quantity">
          {t('requiredQuantity')}
        </FieldLabel>
        <Input
          id="required_quantity"
          type="number"
          autoComplete="off"
          icon={Banknote}
          min="0"
          placeholder="0.00"
          aria-invalid={!!errors.required_amount}
          {...register('required_amount', {
            validate: {
              required: required(),
              validNum: positiveNumber(),
            },
            disabled: isPending,
            valueAsNumber: true,
          })}
        />
        {errors.required_amount?.message && (
          <FieldError>
            {t(`errors.${errors.required_amount?.message}`)}
          </FieldError>
        )}
      </Field>

      <Controller
        name="is_active"
        control={control}
        render={({ field }) => (
          <SwitchRow
            id="is_active"
            disabled={isPending}
            label={t('labelActive')}
            description={t('descriptionActive')}
            checked={field.value ?? false}
            onCheckedChange={field.onChange}
          />
        )}
      />

      <FormActions
        isEdit={!!defaultValues}
        isLoading={isPending}
        onReset={onReset}
      />
    </form>
  );
}
