import { useTranslation } from 'react-i18next';
import {
  Calendar,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  RefreshCw,
} from 'lucide-react';

import type { DeliveryDetail } from '@/entities/delivery';
import { DetailCard, DetailCell, Separator, SplitDateTime } from '@/shared/ui';

type Props = { delivery: DeliveryDetail };

export function DeliveryInformation({ delivery }: Props) {
  const { t } = useTranslation('delivery-detail', { keyPrefix: 'detail' });

  return (
    <DetailCard
      title={t('sections.timeline')}
      subtitle={t('sections.timelineSubtitle')}
      icon={Clock3}
    >
      <div className="grid grid-cols-2 gap-5">
        <DetailCell label={t('fields.scheduledAt')}>
          <SplitDateTime date={delivery.scheduled_at} icon={Calendar} />
        </DetailCell>
        <DetailCell label={t('fields.completedAt')}>
          {delivery.completed_at ? (
            <SplitDateTime date={delivery.completed_at} icon={CheckCircle2} />
          ) : (
            <span className="text-muted-foreground text-sm">
              {t('notCompleted')}
            </span>
          )}
        </DetailCell>
        <DetailCell label={t('fields.createdAt')}>
          <SplitDateTime date={delivery.created_at} icon={CalendarDays} />
        </DetailCell>
        <DetailCell label={t('fields.updatedAt')}>
          <SplitDateTime date={delivery.updated_at} icon={RefreshCw} />
        </DetailCell>
      </div>

      <Separator />

      <div className="bg-muted/25 rounded-xl border p-4">
        <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-semibold">
          <FileText className="size-4" aria-hidden="true" />
          {t('fields.notes')}
        </div>
        <p className="text-sm leading-relaxed">
          {delivery.notes || t('noNotes')}
        </p>
      </div>
    </DetailCard>
  );
}
