import { Suspense } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BellRing, MessageSquare } from 'lucide-react';

import {
  EmployeeMultiSelect,
  EmployeeMultiSelectSkeleton,
} from '@/entities/employee';
import { Button, Field, FieldLabel, Input, Textarea } from '@/shared/ui';

import { useSendNotification } from '../model/useSendNotification';
import type { SendNotificationFormValues } from '../model/notificationTypes';
import {
  validateBody,
  validateRecipients,
  validateTitle,
} from '../lib/validate';

const DEFAULT_VALUES: SendNotificationFormValues = {
  title: '',
  body: '',
  user_ids: [],
};

type SendNotificationFormProps = {
  onSuccess: () => void;
};

export function SendNotificationForm({ onSuccess }: SendNotificationFormProps) {
  const { t } = useTranslation('send-notification');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SendNotificationFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const { mutateAsync, isPending } = useSendNotification();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutateAsync(values);
      onSuccess();
    } catch {
      // Error toast already handled by useCreateEntity's side effects.
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-5">
      <Field className="flex flex-col gap-1.5">
        <FieldLabel htmlFor="notification-title">
          {t('fields.title.label')}
        </FieldLabel>
        <Input
          id="notification-title"
          icon={BellRing}
          aria-invalid={Boolean(errors.title)}
          {...register('title', { validate: validateTitle })}
        />
        {errors.title?.message && (
          <p className="text-destructive text-xs">
            {t(`errors.${errors.title.message}`)}
          </p>
        )}
      </Field>

      <Field className="flex flex-col gap-1.5">
        <FieldLabel htmlFor="notification-body">
          {t('fields.body.label')}
        </FieldLabel>
        <Textarea
          id="notification-body"
          icon={MessageSquare}
          rows={4}
          aria-invalid={Boolean(errors.body)}
          {...register('body', { validate: validateBody })}
        />
        {errors.body?.message && (
          <p className="text-destructive text-xs">
            {t(`errors.${errors.body.message}`)}
          </p>
        )}
      </Field>

      <Field className="flex flex-col gap-1.5">
        <FieldLabel asChild>
          <p>{t('fields.recipients.label')}</p>
        </FieldLabel>
        <Controller
          control={control}
          name="user_ids"
          rules={{ validate: validateRecipients }}
          render={({ field }) => (
            <Suspense fallback={<EmployeeMultiSelectSkeleton />}>
              <EmployeeMultiSelect
                value={field.value}
                onChange={field.onChange}
                invalid={Boolean(errors.user_ids)}
              />
            </Suspense>
          )}
        />
        {errors.user_ids?.message && (
          <p className="text-destructive text-xs">
            {t(`errors.${errors.user_ids.message}`)}
          </p>
        )}
      </Field>

      <Button
        type="submit"
        disabled={isSubmitting || isPending}
        className="mt-auto"
      >
        {isPending ? t('actions.sending') : t('actions.send')}
      </Button>
    </form>
  );
}
