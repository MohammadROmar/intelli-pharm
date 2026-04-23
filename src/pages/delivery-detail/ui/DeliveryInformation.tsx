import { useTranslation } from 'react-i18next';
import {
  Calendar,
  CalendarDays,
  CheckCircle2,
  Contact,
  RefreshCw,
} from 'lucide-react';

import type { DeliveryDetail } from '@/entities/delivery';
import { DetailCard, DetailCell, Separator, SplitDateTime } from '@/shared/ui';

type Props = { delivery: DeliveryDetail };

export function DeliveryInformation({ delivery }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'deliveriesPage.detail',
  });

  return (
    <DetailCard
      title={t('sections.delivery')}
      subtitle={t('sections.deliverySubtitle')}
      icon={Contact}
    >
      <div className="grid grid-cols-2 gap-6">
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
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('fields.createdAt')}>
          <SplitDateTime date={delivery.created_at} icon={CalendarDays} />
        </DetailCell>
        <DetailCell label={t('fields.updatedAt')}>
          <SplitDateTime date={delivery.updated_at} icon={RefreshCw} />
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        {delivery.notes && (
          <DetailCell label={t('fields.notes')} className="sm:col-span-2">
            <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap">
              {delivery.notes}
            </p>
          </DetailCell>
        )}
      </div>
    </DetailCard>
  );
}
