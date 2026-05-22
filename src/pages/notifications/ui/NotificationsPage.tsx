import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Bell } from 'lucide-react';

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

import type { ReadStatusFilter } from '../model/types';
import { NotificationsContent } from './NotificationsContent';

const TAB_OPTIONS: ReadStatusFilter[] = ['all', 'read', 'unread'];

export default function NotificationsPage() {
  return (
    <QueryErrorBoundary>
      <NotificationsPageContent />
    </QueryErrorBoundary>
  );
}

export function NotificationsPageContent() {
  const { t } = useTranslation('notifications');
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab =
    (searchParams.get('read_status') as Exclude<
      ReadStatusFilter,
      'all'
    > | null) ?? 'all';

  const handleTabChange = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('page');
      if (value === 'all') {
        next.delete('read_status');
      } else {
        next.set('read_status', value);
      }
      return next;
    });
  };

  const pageTitle = `${t('page.title')} - IntelliPharma`;

  return (
    <>
      <title>{pageTitle}</title>

      <div className="container mx-auto max-w-3xl">
        <Card className="gap-4!">
          <CardHeader className="space-y-2">
            <CardSectionHeader
              title={t('page.title')}
              description={t('page.description')}
              icon={Bell}
            />

            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="pt-1"
            >
              <TabsList>
                {TAB_OPTIONS.map((tab) => (
                  <TabsTrigger key={tab} value={tab} className="cursor-pointer">
                    {t(`tabs.${tab}`)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardHeader>

          <Separator />

          <NotificationsContent />
        </Card>
      </div>
    </>
  );
}
