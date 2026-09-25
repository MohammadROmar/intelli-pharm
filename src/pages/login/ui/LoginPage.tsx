import { useTranslation } from 'react-i18next';

import { LoginForm } from '@/features/auth';
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

import { DemoCredentialsCard } from './DemoCredentialsCard';

export default function LoginPage() {
  const { t } = useTranslation('login');

  return (
    <main className="relative flex min-h-dvh w-full items-center justify-center overflow-x-hidden p-6 md:p-10">
      <BackgroundPattern />

      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-[both] mb-8 flex items-center justify-center gap-2 duration-700 motion-reduce:animate-none">
          <div className="bg-primary flex size-8 items-center justify-center rounded-lg">
            <Logo className="size-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">IntelliPharma</h1>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-[both] duration-700 [animation-delay:100ms] motion-reduce:animate-none">
          <DemoCredentialsCard />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-5 fill-mode-[both] flex flex-col gap-6 duration-700 [animation-delay:200ms] motion-reduce:animate-none">
          <Card>
            <CardHeader>
              <CardTitle>{t('title')}</CardTitle>
              <CardDescription>{t('subtitle')}</CardDescription>
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
