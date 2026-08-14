import { useTranslation } from 'react-i18next';
import { Bell } from 'lucide-react';

import { NotificationActivationBanner } from '@/features/notifications';
import { useHasPermission } from '@/entities/session';
import {
  Card,
  CardHeader,
  CardSectionHeader,
  QueryErrorBoundary,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/shared/ui';

import { NotificationsContent } from './NotificationsContent';
import { NotificationsDateFilter } from './NotificationsDateFilter';
import { TAB_OPTIONS, useReadStatusFilter } from '../model/useReadStatusFilter';

export default function NotificationsPage() {
  return (
    <QueryErrorBoundary>
      <NotificationsPageContent />
    </QueryErrorBoundary>
  );
}

export function NotificationsPageContent() {
  const { t } = useTranslation('notifications');
  const { activeTab, handleTabChange } = useReadStatusFilter();

  const canReceiveStockNotifications = useHasPermission(
    'erp.stock.notifications.get',
  );

  const pageTitle = `${t('page.title')} - IntelliPharma`;

  return (
    <>
      <title>{pageTitle}</title>

      <div className="container mx-auto grid size-full max-w-3xl">
        <Card className="gap-4!">
          <CardHeader className="flex! flex-col flex-wrap gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardSectionHeader
              title={t('page.title')}
              description={t('page.description')}
              icon={Bell}
            />

            <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full sm:w-auto"
              >
                <TabsList className="w-full sm:w-auto">
                  {TAB_OPTIONS.map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="w-full cursor-pointer sm:w-auto"
                    >
                      {t(`tabs.${tab}`)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <NotificationsDateFilter triggerLabel={t('filters.trigger')} />
            </div>
          </CardHeader>

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
