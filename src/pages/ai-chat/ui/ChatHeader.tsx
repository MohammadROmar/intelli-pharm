import { useTranslation } from 'react-i18next';
import { ArrowLeft, Bot } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/shared/ui';

type DashboardLinkProps = {
  label: string;
  mobile?: boolean;
};

function DashboardLink({ label, mobile = false }: DashboardLinkProps) {
  return (
    <Button
      variant="ghost"
      size={mobile ? 'icon' : 'sm'}
      asChild
      className={mobile ? 'size-11 md:hidden' : 'hidden gap-2 md:inline-flex'}
    >
      <Link to="/dashboard" aria-label={mobile ? label : undefined}>
        <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
        {mobile ? null : <span>{label}</span>}
      </Link>
    </Button>
  );
}

export function ChatHeader() {
  const { t } = useTranslation('chat');
  const dashboardLabel = t('backToDashboard');

  return (
    <header className="border-border bg-background flex h-16 shrink-0 items-center border-b">
      <div className="mx-auto grid h-full w-full max-w-3xl grid-cols-[minmax(2.75rem,1fr)_auto_minmax(2.75rem,1fr)] items-center gap-2 px-3 sm:px-4">
        <div className="w-11 justify-self-start md:w-24">
          <DashboardLink label={dashboardLabel} />
        </div>

        <div className="flex min-w-0 items-center justify-center gap-2">
          <Bot className="text-primary size-4 shrink-0" aria-hidden />
          <h1
            translate="no"
            className="text-foreground truncate text-sm font-semibold"
          >
            {t('headerTitle')}
          </h1>
        </div>

        <div className="flex w-11 justify-end justify-self-end md:w-24">
          <DashboardLink label={dashboardLabel} mobile />
        </div>
      </div>
    </header>
  );
}
