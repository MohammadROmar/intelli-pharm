import { memo } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowRight, BellDot, CircleCheckBig } from 'lucide-react';

import { selectUnreadNotifications } from '@/entities/session';
import { cn } from '@/shared/lib';
import { useAppSelector } from '@/shared/config';
import { Card, CardContent } from '@/shared/ui';

type Props = { className?: string };

export const OverviewNotificationSummary = memo(
  function OverviewNotificationSummary({ className }: Props) {
    const { t } = useTranslation('dashboard-overview', {
      keyPrefix: 'notifications',
    });
    const unreadCount = useAppSelector(selectUnreadNotifications);
    const hasUnread = unreadCount > 0;
    const StatusIcon = hasUnread ? BellDot : CircleCheckBig;

    return (
      <Link
        to="/dashboard/notifications"
        aria-label={t('openAriaLabel', { count: unreadCount })}
        className={cn(
          'group focus-visible:ring-ring/50 rounded-lg focus-visible:ring-[3px] focus-visible:outline-none lg:only:col-span-2',
          className,
        )}
      >
        <Card className="group-hover:border-primary/30 h-full gap-0 py-2! transition-colors">
          <CardContent className="flex min-h-16! items-center gap-2.5 p-3!">
            <div
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-lg sm:size-9',
                hasUnread
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground',
              )}
            >
              <StatusIcon className="size-4 shrink-0 sm:size-5" aria-hidden />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-sm leading-5 font-medium">
                {hasUnread ? t('unreadTitle') : t('allReadTitle')}
              </h2>
              <p className="text-muted-foreground line-clamp-1 text-xs leading-5">
                {hasUnread
                  ? t('unread', { count: unreadCount })
                  : t('allReadDescription')}
              </p>
            </div>

            <ArrowRight
              className="text-muted-foreground size-3 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              aria-hidden
            />
          </CardContent>
        </Card>
      </Link>
    );
  },
);
