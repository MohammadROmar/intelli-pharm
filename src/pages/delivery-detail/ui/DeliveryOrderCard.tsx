import { useTranslation } from 'react-i18next';
import { Package, Cross, Tag } from 'lucide-react';

import type { DeliveryOrder } from '@/entities/delivery';
import { formatPrice } from '@/shared/lib';
import { BadgeLink, DetailCard, DetailCell, Separator } from '@/shared/ui';

type Props = { order: DeliveryOrder };

export function DeliveryOrderCard({ order }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'deliveriesPage.detail',
  });

  const hasDiscount = order.offer_id !== null && parseFloat(order.discount) > 0;

  return (
    <DetailCard
      title={t('sections.order')}
      subtitle={t('sections.orderSubtitle')}
      icon={Package}
    >
      <DetailCell label={t('fields.orderId')}>
        <BadgeLink
          label={`ORD-${String(order.id).padStart(6, '0')}`}
          to={`/dashboard/orders/${order.id}`}
          icon={Package}
        />
      </DetailCell>

      <Separator />

      <DetailCell label={t('fields.orderPharmacy')}>
        <BadgeLink
          label={order.pharmacy.name}
          to={`/dashboard/pharmacies/${order.pharmacy.id}`}
          icon={Cross}
        />
      </DetailCell>

      {order.offer_id !== null && (
        <>
          <Separator />
          <DetailCell label={t('fields.appliedOffer')}>
            <BadgeLink
              label={`OFF-${String(order.offer_id).padStart(6, '0')}`}
              to={`/dashboard/promotions/offers/${order.offer_id}`}
              icon={Tag}
            />
          </DetailCell>
        </>
      )}

      <Separator />

      {hasDiscount ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs font-medium">
              {t('fields.orderSubtotal')}
            </span>
            <span className="text-muted-foreground text-sm tabular-nums line-through">
              {formatPrice(order.total_amount, i18n.language)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-badge-success-text/80 text-xs font-medium">
              {t('fields.orderDiscount')}
              {order.percentage !== null && (
                <span className="ml-1">({order.percentage}%)</span>
              )}
            </span>
            <span className="text-badge-success-text text-sm tabular-nums">
              −{formatPrice(order.discount, i18n.language)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold">
              {t('fields.orderFinalTotal')}
            </span>
            <span className="font-bold tabular-nums">
              {formatPrice(order.final_total, i18n.language)}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs font-medium">
            {t('fields.orderTotal')}
          </span>
          <span className="font-bold tabular-nums">
            {formatPrice(order.total_amount, i18n.language)}
          </span>
        </div>
      )}
    </DetailCard>
  );
}
