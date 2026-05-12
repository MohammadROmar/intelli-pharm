import { useTranslation } from 'react-i18next';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Banknote, Target } from 'lucide-react';

import type { EditTargetDto } from '@/entities/target';
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
  defaultValues?: EditTargetDto;
  onSubmit: SubmitHandler<EditTargetDto>;
};

export function EditTargetForm({
  isPending,
  onReset,
  defaultValues,
  onSubmit,
}: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'targetsPage.edit',
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTargetDto>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field data-invalid={!!errors.name}>
        <FieldLabel htmlFor="name">{t('name')}</FieldLabel>
        <Input
          id="name"
          type="text"
          autoComplete="off"
          icon={Target}
          placeholder={t('placeholders.name')}
          aria-invalid={!!errors.name}
          {...register('name', {
            validate: {
              required: required(),
            },
            disabled: isPending,
          })}
        />
        {errors.name?.message && (
          <FieldError>{t(`errors.${errors.name.message}`)}</FieldError>
        )}
      </Field>

      <Field data-invalid={!!errors.value}>
        <FieldLabel htmlFor="value">{t('value')}</FieldLabel>
        <Input
          id="value"
          type="number"
          autoComplete="off"
          icon={Banknote}
          min="0"
          placeholder="0.00"
          aria-invalid={!!errors.value}
          {...register('value', {
            validate: {
              required: required(),
              validNum: positiveNumber(),
            },
            disabled: isPending,
            valueAsNumber: true,
          })}
        />
        {errors.value?.message && (
          <FieldError>{t(`errors.${errors.value.message}`)}</FieldError>
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
