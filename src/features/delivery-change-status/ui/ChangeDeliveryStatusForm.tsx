import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Controller,
  useForm,
  useWatch,
  type SubmitHandler,
} from 'react-hook-form';
import { BadgeDollarSign, User } from 'lucide-react';

import type { ChangeDeliveryStatusValues } from '@/entities/delivery';
import { required } from '@/shared/form';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FormActions,
  GenericSingleSelect,
  Input,
  Textarea,
} from '@/shared/ui';

import { DELIVERY_TRANSITIONS } from '../lib/utils';
import { nonNegativeNumber } from '../lib/nonNegativeNumber';

type Props = {
  isPending?: boolean;
  onReset: () => void;
  onSubmit: SubmitHandler<ChangeDeliveryStatusValues>;
  defaultValues?: Partial<ChangeDeliveryStatusValues>;
};

export function ChangeDeliveryStatusForm({
  isPending,
  onSubmit,
  onReset,
  defaultValues,
}: Props) {
  const { t } = useTranslation('deliveries', { keyPrefix: 'changeStatus' });

  const statusOptions = useMemo(() => DELIVERY_TRANSITIONS(t), [t]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeDeliveryStatusValues>({
    defaultValues,
    mode: 'onTouched',
  });

  const watchedStatus = useWatch({ control, name: 'status' });
  const isCompleting = watchedStatus === 'completed';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-full flex-col justify-between gap-6"
    >
      <FieldGroup className="gap-5!">
        <Controller
          name="status"
          control={control}
          rules={{ validate: required() }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel asChild>
                <p>{t('labelStatus')}</p>
              </FieldLabel>
              <GenericSingleSelect
                options={statusOptions}
                labelKey="label"
                valueKey="value"
                value={field.value}
                onValueChange={field.onChange}
                disabled={isPending}
                invalid={fieldState.invalid}
                placeholder={t('statusPlaceholder')}
                hasMoreLabel={false}
              />
              {fieldState.error && (
                <FieldError>{t(fieldState.error.message!)}</FieldError>
              )}
            </Field>
          )}
        />

        <Field data-invalid={!!errors.payment_amount}>
          <FieldLabel htmlFor="payment_amount">
            {t('labelPaymentAmount')}
            <span className="text-muted-foreground text-xs font-normal">
              ({t('optional')})
            </span>
          </FieldLabel>
          <Input
            id="payment_amount"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            icon={BadgeDollarSign}
            placeholder="0.00"
            aria-invalid={!!errors.payment_amount}
            {...register('payment_amount', {
              disabled: isPending,
              validate: { positive: nonNegativeNumber() },
            })}
          />
          {errors.payment_amount && (
            <FieldError>{t(errors.payment_amount.message!)}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.receiver_name}>
          <FieldLabel htmlFor="receiver_name">
            {t('labelReceiverName')}
            {!isCompleting && (
              <span className="text-muted-foreground text-xs font-normal">
                ({t('optional')})
              </span>
            )}
          </FieldLabel>
          <Input
            id="receiver_name"
            autoComplete="name"
            required={isCompleting}
            icon={User}
            placeholder={t('placeholderReceiverName')}
            aria-invalid={!!errors.receiver_name}
            {...register('receiver_name', {
              disabled: isPending,
              validate: isCompleting ? { required: required() } : undefined,
            })}
          />
          <FieldDescription className="text-xs">
            {isCompleting
              ? t('hintReceiverNameRequired')
              : t('hintReceiverName')}
          </FieldDescription>
          {errors.receiver_name && (
            <FieldError>{t(errors.receiver_name.message!)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="check_notes">
            {t('labelCheckNotes')}
            <span className="text-muted-foreground text-xs font-normal">
              ({t('optional')})
            </span>
          </FieldLabel>
          <Textarea
            id="check_notes"
            rows={3}
            placeholder={t('placeholderCheckNotes')}
            className="resize-none"
            {...register('check_notes', { disabled: isPending })}
          />
        </Field>
      </FieldGroup>

      <FormActions
        isEdit
        onReset={onReset}
        isLoading={isPending}
        classNames={{
          container:
            'grid! grid-cols-2! items-center! justify-stretch! gap-3! lg:grid! lg:grid-cols-2!',
          reset: 'w-full!',
          submit: 'w-full!',
        }}
      />
    </form>
  );
}
