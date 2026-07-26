import { Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { ReadStatusFilter } from '../model/types';

type Props = { tab: ReadStatusFilter };

export function NotificationsEmptyState({ tab }: Props) {
  const { t } = useTranslation('notifications', { keyPrefix: 'empty' });

  return (
    <div className="flex h-full flex-col items-center justify-center px-4 py-16 text-center">
      <div className="bg-muted mb-3 rounded-full p-4">
        <Bell className="text-muted-foreground size-7" aria-hidden />
      </div>
      <p className="text-sm font-medium">{t(`${tab}.title`)}</p>
      <p className="text-muted-foreground mt-1 max-w-xs text-xs">
        {t(`${tab}.description`)}
      </p>
    </div>
  );
}
