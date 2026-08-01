import { useTranslation } from 'react-i18next';

import { Badge } from '@/shared/ui';
import { cn } from '@/shared/lib';

import { formatRelativeTime } from '../lib/formatRelativeTime';
import type { Notification } from '../model/notificationsTypes';
import {
  fallbackTypeConfig,
  notificationTypeConfig,
} from '../model/notificationTypeConfig';

type Props = {
  isMarking: boolean;
  notification: Notification;
  onMarkAsRead: (notification: Notification) => void;
};

export function NotificationItem({
  notification,
  isMarking,
  onMarkAsRead,
}: Props) {
  const { t, i18n } = useTranslation('notifications');

  const isRead = notification.read_at !== null;
  const typeConfig =
    notificationTypeConfig[notification.type] ?? fallbackTypeConfig;
  const relativeTime = formatRelativeTime(
    notification.created_at,
    i18n.language,
  );

  return (
    <button
      type="button"
      onClick={() => onMarkAsRead(notification)}
      disabled={isRead || isMarking}
      aria-label={
        isRead
          ? notification.title
          : `${t('actions.markAsRead')}: ${notification.title}`
      }
      className={cn(
        'relative flex w-full items-start gap-3 px-6 py-4 text-start',
        'transition-colors duration-150',
        'hover:bg-muted/50 focus-visible:outline-none',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-inset',
        'disabled:cursor-default disabled:hover:bg-transparent',
        !isRead && 'bg-primary/2',
      )}
    >
      {!isRead && (
        <span
          aria-hidden
          className="bg-primary absolute inset-y-0 start-0 w-0.75 rounded-e-sm"
        />
      )}

      <div
        aria-hidden
        className={cn('mt-0.5 shrink-0 rounded-lg p-2', typeConfig.bg)}
      >
        <typeConfig.Icon className={cn('size-4', typeConfig.iconColor)} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              'truncate text-sm',
              isRead ? 'text-muted-foreground' : 'text-foreground font-medium',
            )}
          >
            {notification.title}
          </p>
          <time
            dateTime={notification.created_at}
            className="text-muted-foreground shrink-0 text-xs"
          >
            {relativeTime}
          </time>
        </div>

        <p className="text-muted-foreground mt-0.5 text-xs">
          {notification.body}
        </p>

        <div className="mt-1.5">
          <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
            {t(typeConfig.labelKey)}
          </Badge>
        </div>
      </div>
    </button>
  );
}
