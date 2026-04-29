import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Controller,
  useForm,
  useWatch,
  type SubmitHandler,
} from 'react-hook-form';
import {
  BadgeDollarSign,
  ClipboardCheck,
  StickyNote,
  User,
} from 'lucide-react';

import { DELIVERY_TRANSITIONS, PAYMENT_TRANSITIONS } from '../lib/utils';
import type { ChangeDeliveryStatusValues } from '@/entities/delivery';
import { required, positiveNumber } from '@/shared/form';
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
  const { t } = useTranslation('translation', {
    keyPrefix: 'deliveriesPage.changeStatus',
  });

  const statusOptions = useMemo(() => DELIVERY_TRANSITIONS(t), [t]);
  const paymentOptions = useMemo(() => PAYMENT_TRANSITIONS(t), [t]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeDeliveryStatusValues>({ defaultValues: defaultValues });

  const watchedPaymentStatus = useWatch({ control, name: 'payment_status' });
  const watchedStatus = useWatch({ control, name: 'status' });

  const requiresAmount =
    watchedPaymentStatus === 'paid' || watchedPaymentStatus === 'partial';
  const isCompleting = watchedStatus === 'completed';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col justify-between gap-5 overflow-y-auto"
    >
      <FieldGroup className="gap-5!">
        <Controller
          name="status"
          control={control}
          rules={{ validate: required() }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel asChild>
                <p className="flex items-center gap-1.5">
                  <ClipboardCheck className="text-muted-foreground size-3.5" />
                  {t('labelStatus')}
                </p>
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

        <Controller
          name="payment_status"
          control={control}
          rules={{ validate: required() }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel asChild>
                <p>{t('labelPaymentStatus')}</p>
              </FieldLabel>
              <GenericSingleSelect
                options={paymentOptions}
                labelKey="label"
                valueKey="value"
                value={field.value}
                onValueChange={field.onChange}
                disabled={isPending}
                invalid={fieldState.invalid}
                placeholder={t('paymentStatusPlaceholder')}
                hasMoreLabel={false}
              />
              {fieldState.error && (
                <FieldError>{t(fieldState.error.message!)}</FieldError>
              )}
            </Field>
          )}
        />

        {requiresAmount && (
          <Field data-invalid={!!errors.payment_amount}>
            <FieldLabel htmlFor="payment_amount">
              <span className="flex items-center gap-1.5">
                <BadgeDollarSign className="text-muted-foreground size-3.5" />
                {t('labelPaymentAmount')}
              </span>
            </FieldLabel>
            <Input
              id="payment_amount"
              type="number"
              min="0"
              step="0.01"
              icon={BadgeDollarSign}
              placeholder="0.00"
              aria-invalid={!!errors.payment_amount}
              {...register('payment_amount', {
                disabled: isPending,
                validate: { required: required(), positive: positiveNumber() },
              })}
            />
            {errors.payment_amount && (
              <FieldError>{t(errors.payment_amount.message!)}</FieldError>
            )}
          </Field>
        )}

        <Field data-invalid={!!errors.receiver_name}>
          <FieldLabel htmlFor="receiver_name">
            <span className="flex items-center gap-1.5">
              <User className="text-muted-foreground size-3.5" />
              {t('labelReceiverName')}
              {isCompleting && (
                <span className="text-destructive text-xs">*</span>
              )}
            </span>
          </FieldLabel>
          <Input
            id="receiver_name"
            autoComplete="off"
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
            <span className="flex items-center gap-1.5">
              <StickyNote className="text-muted-foreground size-3.5" />
              {t('labelCheckNotes')}
              <span className="text-muted-foreground text-xs font-normal">
                ({t('optional')})
              </span>
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
          container: 'lg:justify-center! lg:flex-col-reverse! lg:items-center!',
          reset: 'w-full',
          submit: 'w-full',
        }}
      />
    </form>
  );
}
