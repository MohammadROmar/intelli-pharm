import { Link, useRouteError } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

import { useAppSelector } from '@/shared/config';
import { buttonVariants } from '@/shared/lib';
import { BackgroundPattern, Logo } from '@/shared/ui';

export default function ErrorPage() {
  const { t } = useTranslation();
  const error = useRouteError() as Error;

  const { isAuthenticated } = useAppSelector((state) => state.session);

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-hidden p-16">
      <BackgroundPattern />
      <div className="mb-8 flex items-center justify-center gap-2">
        <div className="bg-primary flex size-8 items-center justify-center rounded-lg">
          <Logo className="size-5 text-white" />
        </div>
        <h1 className="text-xl font-bold">IntelliPharm</h1>
      </div>

      <div className="mt-8 flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="mb-2 text-4xl font-bold">{t('errorPage.title')}</h1>
        <p className="text-muted-foreground">{t('errorPage.subtitle')}</p>
        {error && error.message && (
          <p className="text-muted-foreground mt-2">{error.message}</p>
        )}
        <Link
          to={isAuthenticated ? '/dashboard' : ''}
          className={buttonVariants({
            className: 'mt-8 flex cursor-pointer items-center gap-2',
          })}
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          <span>{t('errorPage.action')}</span>
        </Link>
      </div>
    </main>
  );
}
