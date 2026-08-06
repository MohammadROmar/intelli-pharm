import { useTranslation } from 'react-i18next';
import {
  Cross,
  Package,
  RefreshCw,
  ShoppingCart,
  CalendarDays,
  Tag,
  User,
  Warehouse,
} from 'lucide-react';

import { OrderStatusBadge, type OrderDetail } from '@/entities/order';
import { formatPrice } from '@/shared/lib';
import {
  Separator,
  BadgeLink,
  DetailCard,
  DetailCell,
  SplitDateTime,
} from '@/shared/ui';

type Props = {
  order: OrderDetail;
  canViewPharmacy: boolean;
  canViewEmployee: boolean;
  canViewOffer: boolean;
};

export function OrderInfoCard({
  order,
  canViewPharmacy,
  canViewEmployee,
  canViewOffer,
}: Props) {
  const { t, i18n } = useTranslation('orders', {
    keyPrefix: 'detail',
  });

  const hasDiscount = order.offer_id !== null && parseFloat(order.discount) > 0;

  return (
    <DetailCard
      title={t('cardTitle')}
      subtitle={t('cardSubtitle')}
      icon={ShoppingCart}
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelId')}>
          <span className="font-mono">
            ORD-{String(order.id).padStart(6, '0')}
          </span>
        </DetailCell>
        <DetailCell label={t('labelStatus')}>
          <OrderStatusBadge status={order.status} />
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelPharmacy')}>
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
        <DetailCell label={t('labelWarehouse')}>
          <span className="flex items-center gap-1.5">
            <Warehouse className="text-muted-foreground size-3.5 shrink-0" />
            {order.warehouse_id}
          </span>
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelCreatedBy')}>
          <BadgeLink
            to={
              canViewEmployee
                ? `/dashboard/employees/${order.created_by}`
                : undefined
            }
            label={order.created_by_name}
            icon={User}
          />
        </DetailCell>

        {order.offer_id !== null && (
          <DetailCell label={t('labelOffer')}>
            <BadgeLink
              label={`#${order.offer_id}`}
              to={
                canViewOffer
                  ? `/dashboard/promotions/offers/${order.offer_id}`
                  : undefined
              }
              icon={Tag}
            />
          </DetailCell>
        )}
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelTotalQuantity')}>
          <span className="flex items-center gap-1.5">
            <Package className="text-muted-foreground size-3.5 shrink-0" />
            <span className="tabular-nums">{order.total_quantity ?? 0}</span>
            <span className="text-muted-foreground text-xs font-normal">
              {t('units')}
            </span>
          </span>
        </DetailCell>

        {hasDiscount ? (
          <DetailCell label={t('labelSubtotal')}>
            <span className="text-muted-foreground tabular-nums line-through">
              {formatPrice(order.total_amount, i18n.language)}
            </span>
          </DetailCell>
        ) : (
          <DetailCell label={t('labelTotalAmount')}>
            <span className="text-xl font-bold tabular-nums">
              {formatPrice(order.total_amount, i18n.language)}
            </span>
          </DetailCell>
        )}
      </div>

      {hasDiscount && (
        <>
          <div className="grid grid-cols-2 gap-6">
            <DetailCell label={t('labelDiscount')}>
              <p className="text-badge-success-text flex items-center gap-1 tabular-nums">
                <span>−{formatPrice(order.discount, i18n.language)}</span>
                {order.percentage !== null && (
                  <span className="text-badge-success-text/70 text-xs">
                    ({order.percentage}%)
                  </span>
                )}
              </p>
            </DetailCell>

            <DetailCell label={t('labelFinalTotal')}>
              <span className="text-xl font-bold tabular-nums">
                {formatPrice(order.final_total, i18n.language)}
              </span>
            </DetailCell>
          </div>
        </>
      )}

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelCreatedAt')} className="min-w-0">
          <SplitDateTime date={order.created_at} icon={CalendarDays} />
        </DetailCell>
        <DetailCell label={t('labelUpdatedAt')} className="min-w-0">
          <SplitDateTime date={order.updated_at} icon={RefreshCw} />
        </DetailCell>
      </div>

      {order.notes && (
        <>
          <Separator />
          <DetailCell label={t('labelNotes')}>
            <p className="text-sm leading-relaxed whitespace-break-spaces">
              {order.notes}
            </p>
          </DetailCell>
        </>
      )}
    </DetailCard>
  );
}
