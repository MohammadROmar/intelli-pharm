import { useTranslation } from 'react-i18next';
import { useForm, type SubmitHandler } from 'react-hook-form';

import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/shared/ui';
import { useLogin } from '../model/useLogin';

type FormFields = { email: string; password: string };

export function LoginForm() {
  const { t } = useTranslation();

  const { isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">{t('loginPage.email')}</FieldLabel>
          <Input
            id="email"
            type="email"
            {...register('email', {
              required: true,
              disabled: isPending,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            autoComplete="email"
            placeholder="m@example.com"
          />

          {errors.email && (
            <FieldError>
              {t('form.errors.invalidField', {
                field: t('form.fields.email'),
              })}
            </FieldError>
          )}
        </Field>
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">{t('loginPage.password')}</FieldLabel>
          <Input
            id="password"
            {...register('password', {
              required: true,
              disabled: isPending,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            })}
            name="password"
            autoComplete="current-password"
            type="password"
          />
          {errors.password && (
            <FieldError>
              {t('form.errors.invalidField', {
                field: t('form.fields.password'),
                trailing: 'ة',
              })}
            </FieldError>
          )}
        </Field>
        <Field>
          <Button disabled={isPending} type="submit">
            {t('loginPage.login')}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
