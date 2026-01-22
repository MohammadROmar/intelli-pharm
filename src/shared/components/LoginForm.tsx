import { useTranslation } from 'react-i18next';
import type { ComponentProps } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';

function LoginForm({ className, ...props }: ComponentProps<'form'>) {
  const { t } = useTranslation();

  return (
    <>
      <form className={cn('flex flex-col gap-6', className)} {...props}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">{t('loginPage.title')}</h1>
            <p className="text-muted-foreground text-sm text-balance">
              {t('loginPage.subtitle')}
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="email">{t('loginPage.email')}</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">
              {t('loginPage.password')}
            </FieldLabel>
            <Input id="password" type="password" required />
          </Field>
          <Field>
            <Button type="submit">{t('loginPage.login')}</Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}

export default LoginForm;
