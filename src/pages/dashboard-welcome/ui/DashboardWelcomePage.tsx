import { useTranslation } from 'react-i18next';
import { ArrowRight, Bot, Pill, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/shared/ui';
import { buttonVariants } from '@/shared/lib';

export default function DashboardWelcomePage() {
  const { t } = useTranslation('dashboard-welcome');

  return (
    <main className="bg-card relative isolate flex min-h-[calc(100dvh-8rem)] items-center justify-center overflow-hidden rounded-2xl border px-5 py-12 sm:px-8">
      <div
        aria-hidden="true"
        className="bg-primary/10 absolute -end-20 -top-24 size-72 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-accent/10 absolute -start-16 -bottom-28 size-80 rounded-full blur-3xl"
      />

      <div className="relative grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1fr_0.72fr] lg:gap-14">
        <section className="max-w-2xl text-center lg:text-start">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-sm leading-6 text-pretty sm:text-base sm:leading-7 lg:mx-0">
            {t('description')}
          </p>

          <div className="mt-7 flex items-center sm:flex-row sm:justify-center lg:justify-start">
            <Button asChild>
              <Link
                to="/chat"
                className={buttonVariants({ className: 'w-full sm:w-auto' })}
              >
                <Bot className="size-4" />
                {t('chatAction')}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </section>

        <div
          aria-hidden="true"
          className="relative mx-auto flex aspect-square w-full max-w-72 items-center justify-center"
        >
          <div className="border-primary/15 absolute inset-0 rounded-full border" />
          <div className="border-primary/20 absolute inset-[14%] rounded-full border border-dashed" />
          <div className="bg-background/70 ring-border/70 relative flex size-32 items-center justify-center rounded-4xl shadow-xl ring-1 backdrop-blur sm:size-36">
            <Pill className="text-primary size-14 rotate-[-18deg] sm:size-16" />
          </div>
          <div className="bg-card ring-border absolute end-[3%] top-[18%] flex size-11 items-center justify-center rounded-xl shadow-md ring-1">
            <ShieldCheck className="text-primary size-5" />
          </div>
          <div className="bg-card ring-border absolute start-[8%] bottom-[12%] flex size-10 items-center justify-center rounded-xl shadow-md ring-1">
            <Sparkles className="text-primary size-4" />
          </div>
        </div>
      </div>
    </main>
  );
}
