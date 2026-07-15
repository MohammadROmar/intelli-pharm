import { useCallback, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCheck } from 'lucide-react';

import type { NotificationsParams } from '../model/types';
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
import type { Notification } from '../model/types';
import { useGetNotifications } from '../model/useGetNotifications';
import { useMarkNotificationAsRead } from '../model/useMarkNotificationAsRead';
import { useMarkAllNotificationsAsRead } from '../model/useMarkAllNotificationsAsRead';

const MAX_VISIBLE_PAGES = 5;
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

const READ_STATUS_FILTER_VALUES = new Set(['read', 'unread']);

function isReadOrUnreadFilter(
  value: string | null,
): value is 'read' | 'unread' {
  return value !== null && READ_STATUS_FILTER_VALUES.has(value);
}

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

  const rawReadStatus = searchParams.get('read_status');
  const readStatusParam = isReadOrUnreadFilter(rawReadStatus)
    ? rawReadStatus
    : null;

  const params: NotificationsParams = useMemo(
    () => ({
      page,
      per_page: perPage,
      ...(readStatusParam !== null && { read_status: readStatusParam }),
    }),
    [page, perPage, readStatusParam],
  );

  const extraParams = useMemo(
    () =>
      params.read_status ? { read_status: params.read_status } : undefined,
    [params.read_status],
  );

  const { data } = useGetNotifications(params);
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

  const hasUnread = useMemo(
    () => !!unreadNotifications && unreadNotifications > 0,
    [unreadNotifications],
  );

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
              isMarking={isMarking && markingNotificationId === notification.id}
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
