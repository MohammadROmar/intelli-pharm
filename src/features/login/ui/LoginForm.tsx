import { useTranslation } from 'react-i18next';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Lock, Mail } from 'lucide-react';

import { useLogin } from '../model/useLogin';
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/shared/ui';

type FormFields = { email: string; password: string };

export function LoginForm() {
  const { t } = useTranslation('login', { keyPrefix: 'form' });

  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
          <Input
            id="email"
            type="email"
            icon={Mail}
            aria-invalid={!!errors.email}
            {...register('email', {
              required: true,
              disabled: isPending,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            autoComplete="email"
            placeholder="example@intellipharma.com"
          />

          {errors.email && (
            <FieldError>
              {t('errors.invalidField', {
                field: t('email'),
              })}
            </FieldError>
          )}
        </Field>
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
          <Input
            id="password"
            icon={Lock}
            aria-invalid={!!errors.password}
            placeholder="••••••••"
            {...register('password', {
              required: true,
              disabled: isPending,
              minLength: 8,
            })}
            name="password"
            autoComplete="current-password"
            type="password"
          />
          {errors.password && (
            <FieldError>{t('errors.minLength', { min: 8 })}</FieldError>
          )}
        </Field>
        <Field>
          <Button
            disabled={isPending}
            isLoading={isPending}
            type="submit"
            className="disabled:button-shimmer"
          >
            {t('submit')}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
