import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Home, ShieldOff } from 'lucide-react';

import { buttonVariants } from '@/shared/lib';
import { useAppSelector } from '@/shared/config';
import { BackgroundPattern, Button } from '@/shared/ui';

export default function ForbiddenPage() {
  const { t } = useTranslation('forbidden');
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.session);

  return (
    <main className="relative grid h-full overflow-x-hidden">
      <BackgroundPattern />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      >
        <span className="text-foreground/4 animate-in fade-in fill-mode-[both] text-[clamp(10rem,38vw,24rem)] leading-none font-black tracking-tighter duration-1000 motion-reduce:animate-none">
          403
        </span>
      </div>

      <section
        aria-labelledby="forbidden-heading"
        className="relative z-10 flex flex-1 flex-col items-center justify-center gap-7 px-6 py-20 text-center"
      >
        <div
          role="status"
          className="bg-destructive/10 text-destructive animate-in fade-in slide-in-from-bottom-2 fill-mode-[both] inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.12em] uppercase duration-500 motion-reduce:animate-none"
        >
          <ShieldOff className="size-3.5 shrink-0" aria-hidden="true" />
          {t('badge', { defaultValue: 'Access denied' })}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-[both] space-y-4 duration-700 [animation-delay:100ms] motion-reduce:animate-none">
          <h1
            id="forbidden-heading"
            className="text-foreground text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            {t('title')}
          </h1>

          <p className="text-muted-foreground mx-auto max-w-sm text-lg leading-relaxed sm:max-w-md sm:text-xl">
            {t('subtitle')}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="bg-border animate-in fade-in fill-mode-[both] h-px w-12 duration-700 [animation-delay:200ms] motion-reduce:animate-none"
        />

        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-[both] flex w-full max-w-xs flex-col gap-3 duration-700 [animation-delay:250ms] motion-reduce:animate-none sm:max-w-none sm:flex-row sm:justify-center">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
            aria-label={t('back')}
            className="group w-full gap-2 sm:w-auto"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
            {t('back')}
          </Button>

          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            aria-label={t('action')}
            className={buttonVariants({
              variant: 'default',
              size: 'lg',
              className: 'group w-full gap-2 sm:w-auto',
            })}
          >
            <Home
              className="size-4 transition-transform duration-200 group-hover:scale-110"
              aria-hidden="true"
            />
            {t('action')}
          </Link>
        </div>
      </section>
    </main>
  );
}
