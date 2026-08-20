import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell } from 'lucide-react';

import { SendNotificationSheet } from '@/features/notification-send';
import {
  CardHeader,
  CardSectionHeader,
  Skeleton,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/shared/ui';

import { NotificationsDateFilter } from './NotificationsDateFilter';
import { TAB_OPTIONS, useReadStatusFilter } from '../model/useReadStatusFilter';

export function NotificationsCardHeader() {
  const { t } = useTranslation('notifications');

  const { activeTab, handleTabChange } = useReadStatusFilter();

  return (
    <CardHeader className="space-y-3">
      <CardSectionHeader
        title={t('page.title')}
        description={t('page.description')}
        icon={Bell}
      />

      <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="w-full">
            {TAB_OPTIONS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="w-full cursor-pointer"
              >
                {t(`tabs.${tab}`)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <NotificationsDateFilter triggerLabel={t('filters.trigger')} />

        <Suspense fallback={<Skeleton className="h-8 w-full md:max-w-28" />}>
          <SendNotificationSheet />
        </Suspense>
      </div>
    </CardHeader>
  );
}
