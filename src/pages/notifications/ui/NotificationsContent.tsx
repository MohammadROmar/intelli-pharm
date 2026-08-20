import { useCallback, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { CheckCheck } from 'lucide-react';

import {
  Badge,
  Button,
  CardContent,
  CardFooter,
  DynamicPagination,
  PerPageSelect,
} from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/shared/config';
import {
  setUnreadNotifications,
  decrementUnreadNotifications,
} from '@/entities/session';

import { NotificationItem } from './NotificationItem';
import { NotificationsEmptyState } from './NotificationsEmptyState';
import type { Notification } from '../model/notificationsTypes';
import { useGetNotifications } from '../model/useGetNotifications';
import { useNotificationsFilters } from '../model/useNotificationsFilters';
import { useMarkNotificationAsRead } from '../model/useMarkNotificationAsRead';
import { useMarkAllNotificationsAsRead } from '../model/useMarkAllNotificationsAsRead';

const MAX_VISIBLE_PAGES = 5;
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

function parsePositiveInt(value: string | null, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function NotificationsContent() {
  const { t } = useTranslation('notifications');
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const page = parsePositiveInt(searchParams.get('page'), DEFAULT_PAGE);
  const perPage = parsePositiveInt(
    searchParams.get('per_page'),
    DEFAULT_PER_PAGE,
  );

  const { filters: notificationsFilters } = useNotificationsFilters();
  const readStatusParam = notificationsFilters.read_status ?? null;

  const { data } = useGetNotifications();
  const {
    mutate: markAsRead,
    isPending: isMarking,
    variables: markingNotificationId,
  } = useMarkNotificationAsRead();
  const { mutate: markAllAsRead, isPending: isMarkingAll } =
    useMarkAllNotificationsAsRead();

  const unreadNotifications = useAppSelector(
    (state) => state.session.unreadNotifications,
  );

  const notifications = useMemo(() => data?.data?.data ?? [], [data]);
  const meta = data?.data?.meta;

  const hasUnread = !!unreadNotifications && unreadNotifications > 0;

  const handleMarkAsRead = useCallback(
    (notification: Notification) => {
      if (notification.read_at !== null) return;

      markAsRead(notification.id, {
        onSuccess: () => dispatch(decrementUnreadNotifications()),
      });
    },
    [markAsRead, dispatch],
  );

  const handleMarkAllAsRead = useCallback(() => {
    markAllAsRead(null, {
      onSuccess: () => dispatch(setUnreadNotifications(0)),
    });
  }, [markAllAsRead, dispatch]);

  if (!meta) return null;

  if (meta.total === 0) {
    return <NotificationsEmptyState tab={readStatusParam ?? 'all'} />;
  }

  const maxPages = Math.ceil(meta.total / meta.per_page);

  return (
    <div className="grid h-full grid-rows-[auto_1fr]">
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

      <div className="grid h-full grid-rows-[1fr_auto] space-y-4">
        {notifications.length !== 0 ? (
          <CardContent className="divide-y p-0!">
            {notifications.map((notification) => (
              <NotificationItem
                isMarking={
                  isMarking && markingNotificationId === notification.id
                }
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </CardContent>
        ) : (
          <NotificationsEmptyState tab={readStatusParam ?? 'all'} />
        )}

        <CardFooter className="flex flex-col flex-wrap items-center gap-4 sm:flex-row sm:justify-between">
          <DynamicPagination
            itemsPerPage={perPage}
            maxVisiblePages={MAX_VISIBLE_PAGES}
            totalItems={meta.total}
            basePath={pathname}
            currentPage={page}
            maxPages={maxPages}
          />
          <PerPageSelect />
        </CardFooter>
      </div>
    </div>
  );
}
