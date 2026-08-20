import { useTranslation } from 'react-i18next';

import { NotificationActivationBanner } from '@/features/notifications';
import { Card, QueryErrorBoundary, Separator } from '@/shared/ui';

import { NotificationsContent } from './NotificationsContent';
import { NotificationsCardHeader } from './NotificationsCardHeader';
import { useNotificationsAccess } from '../model/useNotificationsAccess';

export default function NotificationsPage() {
  return (
    <QueryErrorBoundary>
      <NotificationsPageContent />
    </QueryErrorBoundary>
  );
}

export function NotificationsPageContent() {
  const { t } = useTranslation('notifications');

  const access = useNotificationsAccess();

  const pageTitle = `${t('page.title')} - IntelliPharma`;

  return (
    <>
      <title>{pageTitle}</title>

      <div className="container mx-auto grid size-full max-w-3xl">
        <Card className="gap-4!">
          <NotificationsCardHeader
            canSendNotifications={access.canSendNotifications}
          />

          <NotificationActivationBanner
            detailed
            className="mx-6"
            canReceiveStockNotifications={access.canReceiveStockNotifications}
          />

          <Separator />

          <NotificationsContent />
        </Card>
      </div>
    </>
  );
}
