import { Bell, CalendarClock, FlaskConical, PackageOpen } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { NotificationType } from './notificationsTypes';

type NotificationTypeConfig = {
  Icon: LucideIcon;
  bg: string;
  iconColor: string;
  labelKey: string;
};

export const notificationTypeConfig: Record<
  NotificationType,
  NotificationTypeConfig
> = {
  'shared.notification': {
    Icon: FlaskConical,
    bg: 'bg-violet-100 dark:bg-violet-950',
    iconColor: 'text-violet-600 dark:text-violet-400',
    labelKey: 'item.types.test',
  },
  'erp.stock.low': {
    Icon: PackageOpen,
    bg: 'bg-amber-100 dark:bg-amber-950',
    iconColor: 'text-amber-600 dark:text-amber-400',
    labelKey: 'item.types.erpStockLow',
  },
  'erp.stock.expiry': {
    Icon: CalendarClock,
    bg: 'bg-rose-100 dark:bg-rose-950',
    iconColor: 'text-rose-600 dark:text-rose-400',
    labelKey: 'item.types.erpStockExpiry',
  },
};

export const fallbackTypeConfig: NotificationTypeConfig = {
  Icon: Bell,
  bg: 'bg-muted',
  iconColor: 'text-muted-foreground',
  labelKey: 'item.types.unknown',
};
