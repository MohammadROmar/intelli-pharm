import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

import Logo from '@/shared/components/Logo';
import BackgroundPattern from '@/shared/components/BackgroundPattern';
import { buttonVariants } from '@/shared/components/ui/button-variants';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <main className="relative flex min-h-dvh flex-col p-16">
      <BackgroundPattern />
      <div className="mb-8 flex items-center justify-center gap-2">
        <div className="bg-primary flex size-8 items-center justify-center rounded-lg">
          <Logo className="size-5 text-white" />
        </div>
        <span className="text-xl font-bold">IntelliPharm</span>
      </div>

      <div className="mt-8 flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-muted-foreground text-sm font-semibold">
            404
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-bold">{t('notFoundPage.title')}</h1>
        <p className="text-muted-foreground">{t('notFoundPage.subtitle')}</p>
        <Link
          to="/dashboard"
          className={buttonVariants({
            className: 'mt-8 flex cursor-pointer items-center gap-2',
          })}
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          <span>{t('notFoundPage.action')}</span>
        </Link>
      </div>
    </main>
  );
}
