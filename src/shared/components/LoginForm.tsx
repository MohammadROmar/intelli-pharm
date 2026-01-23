import { useTranslation } from 'react-i18next';

import { cn } from '../lib/utils';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import ModeToggle from './ModeToggle';
import LocaleToggle from './LocaleToggle';

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { t } = useTranslation();

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{t('loginPage.title')}</CardTitle>
          <CardDescription>{t('loginPage.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
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
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-center gap-4">
            <ModeToggle />
            <LocaleToggle />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
