import { useTranslation } from 'react-i18next';

import { NotificationActivationBanner } from '@/features/notifications';
import { useHasPermission } from '@/entities/session';
import { Card, QueryErrorBoundary, Separator } from '@/shared/ui';

import { NotificationsContent } from './NotificationsContent';
import { NotificationsCardHeader } from './NotificationsCardHeader';

export default function NotificationsPage() {
  return (
    <QueryErrorBoundary>
      <NotificationsPageContent />
    </QueryErrorBoundary>
  );
}

export function NotificationsPageContent() {
  const { t } = useTranslation('notifications');

  const canReceiveStockNotifications = useHasPermission(
    'erp.stock.notifications.get',
  );

  const pageTitle = `${t('page.title')} - IntelliPharma`;

  return (
    <>
      <title>{pageTitle}</title>

      <div className="container mx-auto grid size-full max-w-3xl">
        <Card className="gap-4!">
          <NotificationsCardHeader />

          <NotificationActivationBanner
            detailed
            className="mx-6"
            canReceiveStockNotifications={canReceiveStockNotifications}
          />

          <Separator />

          <NotificationsContent />
        </Card>
      </div>
    </>
  );
}
