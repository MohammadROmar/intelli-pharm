import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { CalendarClock, Clock3, Timer, TriangleAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { VisitDetail } from '@/entities/visit';
import { cn, formatDate } from '@/shared/lib';
import { CardSectionHeader, Separator } from '@/shared/ui';

import { formatServiceTime } from '../lib/formatServiceTime';

type MetadataItemProps = {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
  className?: string;
};

function MetadataItem({
  icon: Icon,
  label,
  children,
  className,
}: MetadataItemProps) {
  return (
    <div className={cn('bg-muted/40 rounded-lg border px-3 py-2.5', className)}>
      <div className="text-muted-foreground mb-1 flex items-center gap-1.5 text-xs">
        <Icon className="size-3.5 shrink-0" aria-hidden />
        <span>{label}</span>
      </div>
      <div className="text-sm font-medium wrap-break-word">{children}</div>
    </div>
  );
}

type Props = { visit: VisitDetail };

export function VisitDetailsSection({ visit }: Props) {
  const { t, i18n } = useTranslation('visit-detail', {
    keyPrefix: 'sheet',
  });

  const reportedCause = visit.driver_reported_cause?.trim() || null;
  const timingItems = [
    ...(visit.started_at
      ? [
          {
            key: 'startedAt',
            icon: CalendarClock,
            label: t('details.startedAt'),
            value: formatDate(visit.started_at, i18n.language),
          },
        ]
      : []),
    ...(visit.ended_at
      ? [
          {
            key: 'endedAt',
            icon: CalendarClock,
            label: t('details.endedAt'),
            value: formatDate(visit.ended_at, i18n.language),
          },
        ]
      : []),
    ...(visit.service_time_sec !== null
      ? [
          {
            key: 'serviceTime',
            icon: Timer,
            label: t('details.serviceTime'),
            value: formatServiceTime(visit.service_time_sec, i18n.language),
          },
        ]
      : []),
  ];

  if (timingItems.length === 0 && reportedCause === null) return null;

  return (
    <>
      <div className="flex flex-col gap-3 px-4 py-1">
        <CardSectionHeader
          icon={Clock3}
          title={t('details.title')}
          description={t('details.subtitle')}
        />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {timingItems.map((item, index) => (
            <MetadataItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              className={cn(
                timingItems.length % 2 === 1 &&
                  index === timingItems.length - 1 &&
                  'sm:col-span-2',
              )}
            >
              {item.value}
            </MetadataItem>
          ))}

          {reportedCause && (
            <MetadataItem
              icon={TriangleAlert}
              label={t('details.reportedCause')}
              className="sm:col-span-2"
            >
              {reportedCause}
            </MetadataItem>
          )}
        </div>
      </div>

      <Separator />
    </>
  );
}
