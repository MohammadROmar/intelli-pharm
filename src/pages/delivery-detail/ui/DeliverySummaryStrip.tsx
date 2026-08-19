import { useTranslation } from 'react-i18next';
import {
  Banknote,
  CircleCheck,
  Cross,
  CalendarClock,
  Package,
} from 'lucide-react';

import type { DeliveryDetail } from '@/entities/delivery';
import { formatDate, formatPrice } from '@/shared/lib';
import { DetailSummary, DetailSummaryItem } from '@/shared/ui';

import { calculateRequiredPaymentAmount } from '../lib/calculateRequiredPaymentAmount';

type Props = { delivery: DeliveryDetail };

export function DeliverySummaryStrip({ delivery }: Props) {
  const { t, i18n } = useTranslation('delivery-detail', {
    keyPrefix: 'detail.summary',
  });

  const requiredPaymentAmount = calculateRequiredPaymentAmount(delivery.order);
  const isSettled = requiredPaymentAmount <= 0;

  return (
    <DetailSummary ariaLabel={t('ariaLabel')}>
      <DetailSummaryItem icon={Cross} label={t('pharmacy')}>
        <span className="font-semibold">{delivery.pharmacy_name}</span>
      </DetailSummaryItem>

      <DetailSummaryItem icon={CalendarClock} label={t('scheduledAt')}>
        <span className="flex items-center gap-1.5 text-sm text-wrap">
          {formatDate(delivery.scheduled_at, i18n.language)}
        </span>{' '}
      </DetailSummaryItem>

      <DetailSummaryItem icon={Package} label={t('units')}>
        <span className="font-semibold tabular-nums">
          {delivery.number_of_items.toLocaleString(i18n.language)}
        </span>
      </DetailSummaryItem>

      <DetailSummaryItem
        icon={isSettled ? CircleCheck : Banknote}
        label={t('amountToCollect')}
      >
        {isSettled ? (
          <span className="text-muted-foreground font-semibold">
            {t('paidInFull')}
          </span>
        ) : (
          <span className="text-primary font-bold tabular-nums">
            {formatPrice(requiredPaymentAmount, i18n.language)}
          </span>
        )}
      </DetailSummaryItem>
    </DetailSummary>
  );
}
