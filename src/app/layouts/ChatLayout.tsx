import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Bot } from 'lucide-react';

import { Separator } from '@/shared/ui/index.initial';

export default function ChatLayout() {
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });

  return (
    <div className="flex h-svh flex-col">
      <header className="bg-background/80 supports-backdrop-filter:bg-background/60 shrink-0 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link
            to="/dashboard"
            aria-label={t('backToDashboard')}
            className="flex items-center justify-center gap-2"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" />
            <span aria-hidden className="hidden sm:inline">
              {t('backToDashboard')}
            </span>
          </Link>

          <div className="flex items-center gap-2 rtl:flex-row-reverse">
            <div className="bg-primary flex size-7 items-center justify-center rounded-lg">
              <Bot className="text-primary-foreground size-4" />
            </div>
            <span className="text-sm font-semibold">{t('headerTitle')}</span>
          </div>

          <div aria-hidden className="hidden w-24 sm:block" />
        </div>
        <Separator />
      </header>

      <main className="min-h-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
