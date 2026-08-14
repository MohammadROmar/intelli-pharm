import { useTranslation } from 'react-i18next';
import { Building2, Package, Tag } from 'lucide-react';

import type { DeliveryOrder } from '@/entities/delivery';
import { BadgeLink, DetailCard, DetailCell, Separator } from '@/shared/ui';

type Props = { order: DeliveryOrder };

export function DeliveryOrderCard({ order }: Props) {
  const { t } = useTranslation('delivery-detail', {
    keyPrefix: 'detail',
  });

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
          icon={Building2}
        />
      </DetailCell>

      {order.offer_id !== null ? (
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
      ) : null}
    </DetailCard>
  );
}
