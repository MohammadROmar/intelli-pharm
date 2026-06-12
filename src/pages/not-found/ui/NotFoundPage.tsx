import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Home } from 'lucide-react';

import { useAppSelector } from '@/shared/config';
import { BackgroundPattern, Logo, Button } from '@/shared/ui';
import { buttonVariants } from '@/shared/lib';

export default function NotFoundPage() {
  const { t } = useTranslation('notFound');

  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state) => state.session);

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-hidden p-16">
      <BackgroundPattern />
      <div className="mb-8 flex items-center justify-center gap-2">
        <div className="bg-primary flex size-8 items-center justify-center rounded-lg">
          <Logo className="size-5 text-white" />
        </div>
        <h1 className="text-xl font-bold">IntelliPharma</h1>
      </div>

      <div className="mt-8 flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-muted-foreground mb-3 flex items-center gap-3 text-sm font-semibold">
          404
        </p>

        <h1 className="mb-2 text-4xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">{t('subtitle')}</p>
        <div className="mt-8 flex w-full max-w-sm flex-col items-center gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            variant="ghost"
            size="default"
            aria-label={t('back')}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
            <span>{t('back')}</span>
          </Button>

          <Link
            to={isAuthenticated ? '/dashboard' : ''}
            aria-label={t('action')}
            className={buttonVariants({
              variant: 'default',
              size: 'default',
              className: 'w-full sm:w-auto',
            })}
          >
            <Home className="size-4" aria-hidden />
            <span>{t('action')}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
