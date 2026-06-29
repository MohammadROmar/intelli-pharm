import { Link, useRouteError } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

import { useAppSelector } from '@/shared/config';
import { buttonVariants } from '@/shared/lib';
import { BackgroundPattern, Button, Logo } from '@/shared/ui';

export default function ErrorPage() {
  const { t } = useTranslation('error');
  const { isAuthenticated } = useAppSelector((state) => state.session);

  const routeError = useRouteError();
  const errorMessage = routeError instanceof Error ? routeError.message : null;

  const showError = import.meta.env.DEV && errorMessage !== null;

  return (
    <main className="relative flex min-h-dvh flex-col overflow-x-hidden">
      <BackgroundPattern />

      <header className="relative z-10 shrink-0 px-8 pt-8">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary flex size-9 items-center justify-center rounded-xl shadow-sm">
            <Logo className="text-primary-foreground size-5" />
          </div>
          <span className="text-foreground text-lg font-semibold tracking-tight">
            IntelliPharma
          </span>
        </div>
      </header>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      >
        <span className="text-foreground/4 animate-in fade-in fill-mode-[both] text-[clamp(16rem,50vw,32rem)] leading-none font-black duration-1000 motion-reduce:animate-none">
          !
        </span>
      </div>

      <section
        aria-labelledby="error-heading"
        className="relative z-10 flex flex-1 flex-col items-center justify-center gap-7 px-6 py-20 text-center"
      >
        <div
          role="status"
          className="bg-destructive/10 text-destructive animate-in fade-in slide-in-from-bottom-2 fill-mode-[both] inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.12em] uppercase duration-500 motion-reduce:animate-none"
        >
          <AlertCircle className="size-3.5 shrink-0" aria-hidden />
          {t('badge')}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-[both] space-y-4 duration-700 [animation-delay:100ms] motion-reduce:animate-none">
          <h1
            id="error-heading"
            className="text-foreground text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            {t('title')}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-sm text-lg leading-relaxed sm:max-w-md sm:text-xl">
            {t('subtitle')}
          </p>
        </div>

        {showError && (
          <p className="text-muted-foreground/60 bg-muted/40 animate-in fade-in fill-mode-[both] max-w-sm rounded-lg border px-4 py-3 font-mono text-xs break-all duration-700 [animation-delay:150ms] motion-reduce:animate-none">
            {errorMessage}
          </p>
        )}

        <div
          aria-hidden
          className="bg-border animate-in fade-in fill-mode-[both] h-px w-12 duration-700 [animation-delay:200ms] motion-reduce:animate-none"
        />

        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-[both] flex w-full max-w-xs flex-col gap-3 duration-700 [animation-delay:250ms] motion-reduce:animate-none sm:max-w-none sm:flex-row sm:justify-center">
          <Button
            type="button"
            onClick={() => window.location.reload()}
            variant="outline"
            size="lg"
            aria-label={t('reload')}
            className="group w-full gap-2 sm:w-auto"
          >
            <RefreshCw
              aria-hidden
              className="size-4 origin-center transition-transform duration-200 group-hover:rotate-90"
            />
            {t('reload')}
          </Button>

          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className={buttonVariants({
              variant: 'default',
              size: 'lg',
              className: 'group gap-2',
            })}
          >
            <Home
              aria-hidden
              className="size-4 transition-transform duration-200 group-hover:scale-110"
            />
            {t('home')}
          </Link>
        </div>
      </section>
    </main>
  );
}
