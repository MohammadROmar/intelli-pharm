import { useTranslation } from 'react-i18next';
import { Bell } from 'lucide-react';

import {
  CardHeader,
  CardSectionHeader,
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
  );
}
