import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Eye, LockKeyhole, ShieldCheck } from 'lucide-react';

import { buttonVariants } from '@/shared/lib';
import { BackgroundPattern } from '@/shared/ui';

type Props = { roleId: number };

export function ProtectedRoleEditFallback({ roleId }: Props) {
  const { t } = useTranslation('roles', { keyPrefix: 'edit.restricted' });

  return (
    <main className="relative grid h-full min-h-[60vh] overflow-x-hidden">
      <BackgroundPattern />

      <LockKeyhole
        aria-hidden
        className="text-foreground/4 pointer-events-none absolute top-1/2 left-1/2 size-[clamp(12rem,38vw,24rem)] -translate-x-1/2 -translate-y-1/2 stroke-[0.65]"
      />

      <section
        aria-labelledby="protected-role-heading"
        className="relative z-10 flex flex-col items-center justify-center gap-7 px-6 py-20 text-center"
      >
        <div className="bg-primary/10 text-primary animate-in fade-in slide-in-from-bottom-2 fill-mode-[both] inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.12em] uppercase duration-500 motion-reduce:animate-none">
          <ShieldCheck className="size-3.5 shrink-0" aria-hidden />
          {t('badge')}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-[both] space-y-4 duration-700 [animation-delay:100ms] motion-reduce:animate-none">
          <h1
            id="protected-role-heading"
            className="text-foreground text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {t('title')}
          </h1>

          <p className="text-muted-foreground mx-auto max-w-md text-base leading-relaxed sm:text-lg">
            {t('description')}
          </p>
        </div>

        <div
          aria-hidden
          className="bg-border animate-in fade-in fill-mode-[both] h-px w-12 duration-700 [animation-delay:200ms] motion-reduce:animate-none"
        />

        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-[both] flex w-full max-w-xs flex-col gap-3 duration-700 [animation-delay:250ms] motion-reduce:animate-none sm:max-w-none sm:flex-row sm:justify-center">
          <Link
            to="/dashboard/roles"
            className={buttonVariants({
              variant: 'outline',
              size: 'lg',
              className: 'group w-full gap-2 sm:w-auto',
            })}
          >
            <ArrowLeft
              className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5"
              aria-hidden
            />
            {t('backToRoles')}
          </Link>

          <Link
            to={`/dashboard/roles/${roleId}`}
            className={buttonVariants({
              variant: 'default',
              size: 'lg',
              className: 'group w-full gap-2 sm:w-auto',
            })}
          >
            <Eye
              className="size-4 transition-transform duration-200 group-hover:scale-110"
              aria-hidden
            />
            {t('viewRole')}
          </Link>
        </div>
      </section>
    </main>
  );
}
