import { useTranslation } from 'react-i18next';
import {
  Calendar,
  CalendarDays,
  CheckCircle2,
  Contact,
  RefreshCw,
} from 'lucide-react';

import type { DeliveryDetail } from '@/entities/delivery';
import { formatDate } from '@/shared/lib';
import { DetailCard, DetailCell, Separator } from '@/shared/ui';

type Props = { delivery: DeliveryDetail };

export function DeliveryInformation({ delivery }: Props) {
  const { t, i18n } = useTranslation('translation', {
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
          <span className="flex items-center gap-1.5 font-normal">
            <Calendar className="text-muted-foreground size-3.5 shrink-0" />
            {formatDate(delivery.scheduled_at, i18n.language)}
          </span>
        </DetailCell>
        <DetailCell label={t('fields.completedAt')}>
          {delivery.completed_at ? (
            <span className="flex items-center gap-1.5 font-normal">
              <CheckCircle2 className="text-muted-foreground shrink-0" />
              {formatDate(delivery.completed_at, i18n.language)}
            </span>
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
          <span className="flex items-center gap-1.5 font-normal">
            <CalendarDays className="text-muted-foreground size-3.5 shrink-0" />
            {formatDate(delivery.created_at, i18n.language)}
          </span>
        </DetailCell>
        <DetailCell label={t('fields.updatedAt')}>
          <span className="flex items-center gap-1.5 font-normal">
            <RefreshCw className="text-muted-foreground size-3.5 shrink-0" />
            {formatDate(delivery.updated_at, i18n.language)}
          </span>
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
