import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BadgePercent, DollarSign } from 'lucide-react';

import type { CreatePercentageOfferDto } from '@/entities/offer';
import { positiveNumber, required } from '@/shared/form';
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
  percentage: string;
  is_active: boolean;
};

function toPayload(values: FormValues): CreatePercentageOfferDto {
  return {
    type: 'percentage',
    required_amount: Number(values.required_amount),
    percentage: Number(values.percentage),
    is_active: values.is_active,
  };
}

type Props = {
  onSubmit: (payload: CreatePercentageOfferDto) => void;
  isPending?: boolean;
  onReset: () => void;
};

export function CreatePercentageOfferForm({
  onSubmit,
  isPending,
  onReset,
}: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'offersPage.form.percentage',
  });

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
            icon={BadgePercent}
            title={t('cardTitle')}
            description={t('cardSubtitle')}
          />
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

            <Field data-invalid={!!errors.percentage}>
              <FieldLabel htmlFor="percentage">
                {t('labelPercentage')}
              </FieldLabel>
              <Input
                id="percentage"
                type="number"
                min="0"
                max="100"
                step="0.01"
                icon={BadgePercent}
                placeholder="10"
                aria-invalid={!!errors.percentage}
                {...register('percentage', {
                  disabled: isPending,
                  validate: {
                    required: required(),
                    positive: positiveNumber(),
                    max: (v) => Number(v) <= 100 || 'maxPercentage',
                  },
                })}
              />
              <FieldDescription className="text-xs">
                {t('hintPercentage')}
              </FieldDescription>
              {errors.percentage?.message && (
                <FieldError>{t(errors.percentage.message)}</FieldError>
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
