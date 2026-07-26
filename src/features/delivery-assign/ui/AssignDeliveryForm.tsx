import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  useFormState,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CalendarClock, ClipboardList, StickyNote } from 'lucide-react';

import type { AssignDeliveryPayload } from '@/entities/delivery';
import { required } from '@/shared/form';
import {
  Card,
  CardContent,
  CardHeader,
  CardSectionHeader,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FormActions,
  Input,
  Separator,
  Textarea,
} from '@/shared/ui';
import { EmployeeSelector } from '@/entities/employee';
import { OrderSelector } from '@/entities/order';

type AssignDeliveryFormValues = {
  user_id: string;
  order_id: string;
  scheduled_at: string;
  notes: string;
};

function toPayload(values: AssignDeliveryFormValues): AssignDeliveryPayload {
  const scheduled_at = values.scheduled_at.replace('T', ' ') + ':00';

  return {
    user_id: Number(values.user_id),
    order_id: Number(values.order_id),
    scheduled_at,
    notes: values.notes.trim() || undefined,
  };
}

function getMinDatetime() {
  const now = new Date();
  now.setSeconds(0, 0);
  return now.toISOString().slice(0, 16);
}

function AssignmentCard({ isPending }: { isPending?: boolean }) {
  const { t } = useTranslation('deliveries', {
    keyPrefix: 'form',
  });
  const { control } = useFormContext<AssignDeliveryFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={ClipboardList}
          title={t('assignmentCardTitle')}
          description={t('assignmentCardSubtitle')}
        />
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Controller
            name="user_id"
            control={control}
            rules={{ validate: required() }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel asChild>
                  <p className="flex items-center gap-1.5">
                    {t('labelEmployee')}
                  </p>
                </FieldLabel>
                <EmployeeSelector
                  role="distributor"
                  disabled={isPending}
                  isLoading={isPending}
                  value={field.value}
                  onValueChange={field.onChange}
                  invalid={fieldState.invalid}
                />
                {fieldState.error && (
                  <FieldError>
                    {t(`errors.${fieldState.error.message!}`)}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="order_id"
            control={control}
            rules={{ validate: required() }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel asChild>
                  <p>{t('labelOrder')}</p>
                </FieldLabel>
                <OrderSelector
                  disabled={isPending}
                  isLoading={isPending}
                  value={field.value}
                  onValueChange={field.onChange}
                  invalid={fieldState.invalid}
                />
                {fieldState.error && (
                  <FieldError>
                    {t(`errors.${fieldState.error.message!}`)}
                  </FieldError>
                )}
              </Field>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ScheduleCard({ isPending }: { isPending?: boolean }) {
  'use no memo';

  const { t } = useTranslation('deliveries', {
    keyPrefix: 'form',
  });
  const { register } = useFormContext<AssignDeliveryFormValues>();
  const { errors } = useFormState<AssignDeliveryFormValues>({
    name: ['scheduled_at', 'notes'],
  });

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={CalendarClock}
          title={t('scheduleCardTitle')}
          description={t('scheduleCardSubtitle')}
        />
      </CardHeader>
      <CardContent className="space-y-5">
        <Field data-invalid={!!errors.scheduled_at}>
          <FieldLabel htmlFor="scheduled_at">
            {t('labelScheduledAt')}
          </FieldLabel>
          <Input
            id="scheduled_at"
            type="datetime-local"
            icon={CalendarClock}
            aria-invalid={!!errors.scheduled_at}
            min={getMinDatetime()}
            {...register('scheduled_at', {
              disabled: isPending,
              validate: {
                required: required(),
                notInPast: (v) => {
                  if (!v) return true;
                  return new Date(v) > new Date() || 'notInPast';
                },
              },
            })}
          />
          <FieldDescription className="text-xs">
            {t('hintScheduledAt')}
          </FieldDescription>
          {errors.scheduled_at && (
            <FieldError>
              {t(`errors.${errors.scheduled_at.message!}`)}
            </FieldError>
          )}
        </Field>

        <Separator />

        <Field>
          <FieldLabel htmlFor="notes">
            <span className="flex items-center gap-1.5">
              {t('labelNotes')}
              <span className="text-muted-foreground text-xs font-normal">
                ({t('optional')})
              </span>
            </span>
          </FieldLabel>
          <Textarea
            id="notes"
            rows={3}
            contentEditable
            icon={StickyNote}
            placeholder={t('placeholderNotes')}
            className="resize-none"
            {...register('notes', { disabled: isPending })}
          />
          <FieldDescription className="text-xs">
            {t('hintNotes')}
          </FieldDescription>
        </Field>
      </CardContent>
    </Card>
  );
}

type Props = {
  onSubmit: (payload: AssignDeliveryPayload) => void;
  defaultValues?: Partial<AssignDeliveryFormValues>;
  isPending?: boolean;
  onReset: () => void;
};

export function AssignDeliveryForm({
  onSubmit,
  defaultValues,
  isPending,
  onReset,
}: Props) {
  const methods = useForm<AssignDeliveryFormValues>({
    defaultValues: {
      user_id: '',
      order_id: '',
      scheduled_at: '',
      notes: '',
      ...defaultValues,
    },
    mode: 'onTouched',
  });

  function handleSubmit(values: AssignDeliveryFormValues) {
    onSubmit(toPayload(values));
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        noValidate
        className="space-y-6"
      >
        <AssignmentCard isPending={isPending} />
        <ScheduleCard isPending={isPending} />
        <FormActions
          isEdit={!!defaultValues}
          isLoading={isPending}
          onReset={onReset}
        />
      </form>
    </FormProvider>
  );
}
