import { NotificationActivationBanner } from '@/features/notifications';

import { OverviewNotificationSummary } from './OverviewNotificationSummary';
import { useHasPermission } from '@/entities/session';

export function OverviewNotificationsRow() {
  const canReceiveStockNotifications = useHasPermission(
    'erp.stock.notifications.get',
  );

  if (!canReceiveStockNotifications) return null;

  return (
    <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
      <NotificationActivationBanner
        canReceiveStockNotifications={canReceiveStockNotifications}
        hideUnsupported
        className="h-full"
      />
      <OverviewNotificationSummary />
    </div>
  );
}
