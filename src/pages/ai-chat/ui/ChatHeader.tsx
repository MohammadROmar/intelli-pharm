import { useTranslation } from 'react-i18next';

import { Separator } from '@/shared/ui';
import { SidebarTrigger } from '@/widgets/sidebar';

type ChatHeaderProps = { title: string };

export function ChatHeader({ title }: ChatHeaderProps) {
  const { t } = useTranslation('chat');

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex min-w-0 items-center gap-2 px-3">
        <SidebarTrigger srLabel={t('toggleHistory')} />
        <Separator
          orientation="vertical"
          className="md:h-4! ltr:mr-2 rtl:ml-2"
        />

        <h1
          translate="no"
          className="text-foreground min-w-0 truncate text-sm font-semibold"
        >
          {title}
        </h1>
      </div>
    </header>
  );
}
