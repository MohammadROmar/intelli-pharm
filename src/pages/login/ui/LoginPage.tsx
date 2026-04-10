import { useTranslation } from 'react-i18next';

import { LoginForm } from '@/features/login';
import { ThemeToggle } from '@/features/theme-toggle';
import { LocaleToggle } from '@/features/locale-toggle';
import {
  Logo,
  BackgroundPattern,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui';

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <main className="relative flex min-h-svh w-full items-center justify-center overflow-x-hidden p-6 md:p-10">
      <BackgroundPattern />

      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="bg-primary flex size-8 items-center justify-center rounded-lg">
            <Logo className="size-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">IntelliPharma</h1>
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('loginPage.title')}</CardTitle>
              <CardDescription>{t('loginPage.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center justify-center gap-4">
                <ThemeToggle />
                <LocaleToggle />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
