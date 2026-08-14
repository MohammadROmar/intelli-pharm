import { useTranslation } from 'react-i18next';
import { Banknote, Building2, Package, RefreshCw } from 'lucide-react';

import type { OrderDetail } from '@/entities/order';
import { formatDate, formatPrice } from '@/shared/lib';
import { BadgeLink, DetailSummary, DetailSummaryItem } from '@/shared/ui';

type Props = { order: OrderDetail; canViewPharmacy: boolean };

export function OrderSummaryStrip({ order, canViewPharmacy }: Props) {
  const { t, i18n } = useTranslation('order-detail', {
    keyPrefix: 'detail.summary',
  });

  return (
    <DetailSummary ariaLabel={t('ariaLabel')}>
      <DetailSummaryItem icon={Building2} label={t('pharmacy')}>
        <BadgeLink
          label={order.pharmacy.name}
          to={
            canViewPharmacy
              ? `/dashboard/pharmacies/${order.pharmacy.id}`
              : undefined
          }
          icon={Building2}
        />
      </DetailSummaryItem>

      <DetailSummaryItem icon={Package} label={t('units')}>
        <span className="font-semibold tabular-nums">
          {Number(order.total_quantity || 0).toLocaleString(i18n.language)}
        </span>
      </DetailSummaryItem>

      <DetailSummaryItem icon={Banknote} label={t('finalTotal')}>
        <span className="text-primary font-bold tabular-nums">
          {formatPrice(order.final_total, i18n.language)}
        </span>
      </DetailSummaryItem>

      <DetailSummaryItem icon={RefreshCw} label={t('updatedAt')}>
        <span className="flex items-center gap-1.5 text-sm text-wrap">
          {formatDate(order.updated_at, i18n.language)}
        </span>
      </DetailSummaryItem>
    </DetailSummary>
  );
}
