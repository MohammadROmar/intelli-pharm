import { useTranslation } from 'react-i18next';

import { Button, Field, FieldGroup, FieldLabel, Input } from '@/shared/ui';

export function LoginForm() {
  const { t } = useTranslation();

  return (
    <form>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">{t('loginPage.email')}</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="m@example.com"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">{t('loginPage.password')}</FieldLabel>
          <Input
            id="password"
            name="password"
            autoComplete="current-password"
            type="password"
            required
          />
        </Field>
        <Field>
          <Button type="submit">{t('loginPage.login')}</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
