import { useTranslation } from 'react-i18next';
import { Cross, Package, Tag } from 'lucide-react';

import type { DeliveryOrder } from '@/entities/delivery';
import { BadgeLink, DetailCard, DetailCell, Separator } from '@/shared/ui';

import type { DeliveryDetailAccess } from '../model/useDeliveryDetailAccess';

type Props = { order: DeliveryOrder; actionAccess: DeliveryDetailAccess };

export function DeliveryOrderCard({ order, actionAccess }: Props) {
  const { t } = useTranslation('delivery-detail', { keyPrefix: 'detail' });

  const { canViewOrder, canViewPharmacy, canViewOffer } = actionAccess;

  return (
    <DetailCard
      title={t('sections.order')}
      subtitle={t('sections.orderSubtitle')}
      icon={Package}
    >
      <DetailCell label={t('fields.orderId')}>
        <BadgeLink
          label={`ORD-${String(order.id).padStart(6, '0')}`}
          to={canViewOrder ? `/dashboard/orders/${order.id}` : undefined}
          icon={Package}
        />
      </DetailCell>

      <Separator />

      <DetailCell label={t('fields.orderPharmacy')}>
        <BadgeLink
          label={order.pharmacy.name}
          to={
            canViewPharmacy
              ? `/dashboard/pharmacies/${order.pharmacy.id}`
              : undefined
          }
          icon={Cross}
        />
      </DetailCell>

      {order.offer_id !== null ? (
        <>
          <Separator />
          <DetailCell label={t('fields.appliedOffer')}>
            <BadgeLink
              label={`OFF-${String(order.offer_id).padStart(6, '0')}`}
              to={
                canViewOffer
                  ? `/dashboard/promotions/offers/${order.offer_id}`
                  : undefined
              }
              icon={Tag}
            />
          </DetailCell>
        </>
      ) : null}
    </DetailCard>
  );
}
