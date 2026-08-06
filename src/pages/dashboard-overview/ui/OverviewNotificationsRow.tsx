import { NotificationActivationBanner } from '@/features/notifications';

import { OverviewNotificationSummary } from './OverviewNotificationSummary';

export function OverviewNotificationsRow() {
  return (
    <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
      <NotificationActivationBanner hideUnsupported className="h-full" />
      <OverviewNotificationSummary />
    </div>
  );
}
