import { useCallback, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCheck } from 'lucide-react';

import { Badge, Button, CardContent, CardFooter } from '@/shared/ui';
import { DynamicPagination, PerPageSelect } from '@/shared/ui';

import { useMarkNotificationAsRead } from '../model/useMarkNotificationAsRead';
import { useMarkAllNotificationsAsRead } from '../model/useMarkAllNotificationsAsRead';
import { useGetNotifications } from '../model/useGetNotifications';
import type { Notification, NotificationsParams } from '../model/types';
import { NotificationItem } from './NotificationItem';
import { NotificationsEmptyState } from './NotificationsEmptyState';

const MAX_VISIBLE_PAGES = 7;
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export function NotificationsContent() {
  const { t } = useTranslation('notifications');
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? DEFAULT_PAGE);
  const perPage = Number(searchParams.get('per_page') ?? DEFAULT_PER_PAGE);
  const readStatusParam = searchParams.get('read_status') as
    | 'read'
    | 'unread'
    | null;

  const params: NotificationsParams = {
    page,
    per_page: perPage,
    ...(readStatusParam !== null && { read_status: readStatusParam }),
  };

  const { data } = useGetNotifications(params);
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { mutate: markAllAsRead, isPending: isMarkingAll } =
    useMarkAllNotificationsAsRead();

  const { data: notifications, meta } = data!.data!;

  const hasUnread = useMemo(
    () => notifications.some((n) => n.read_at === null),
    [notifications],
  );

  const handleMarkAsRead = useCallback(
    (notification: Notification) => {
      if (!notification || notification.read_at !== null) return;
      markAsRead(notification.id);
    },
    [markAsRead],
  );

  const handleMarkAllAsRead = useCallback(() => {
    markAllAsRead(null);
  }, [markAllAsRead]);

  const maxPages = Math.ceil(meta.total / meta.per_page);
  const extraParams =
    readStatusParam !== null ? { read_status: readStatusParam } : undefined;

  if (meta.total == 0) {
    return <NotificationsEmptyState tab={readStatusParam ?? 'all'} />;
  }

  return (
    <>
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b px-6 pb-4">
        <div className="flex min-w-0 items-center gap-2">
          <span>{t('page.all')}</span>
          <Badge variant="secondary" className="shrink-0 tabular-nums">
            {meta.total}
          </Badge>
        </div>
        {hasUnread && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={isMarkingAll}
            className="text-muted-foreground hover:text-foreground h-7 gap-1.5 text-xs"
          >
            <CheckCheck className="size-3.5" aria-hidden />
            {t('actions.markAllAsRead')}
          </Button>
        )}
      </div>

      {notifications.length !== 0 ? (
        <CardContent className="divide-y p-0!">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </CardContent>
      ) : (
        <NotificationsEmptyState tab={readStatusParam ?? 'all'} />
      )}

      <CardFooter className="flex flex-col items-center gap-4 sm:justify-between">
        <DynamicPagination
          itemsPerPage={perPage}
          maxVisiblePages={MAX_VISIBLE_PAGES}
          totalItems={meta.total}
          basePath={pathname}
          currentPage={page}
          maxPages={maxPages}
          extraParams={extraParams}
        />
        <PerPageSelect />
      </CardFooter>
    </>
  );
}
