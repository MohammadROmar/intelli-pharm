import { useTranslation } from 'react-i18next';
import {
  Cross,
  Package,
  RefreshCw,
  Boxes,
  ShoppingCart,
  CalendarDays,
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

export function OrderInfoCard({ order }: { order: OrderDetail }) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'ordersPage.detail',
  });

  return (
    <DetailCard
      title={t('cardTitle')}
      subtitle={t('cardSubtitle')}
      icon={ShoppingCart}
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelId')}>
          <span>{order.id}</span>
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
            to={`/dashboard/pharmacies/${order.pharmacy.id}`}
            icon={Cross}
          />
        </DetailCell>
        <DetailCell label={t('labelWarehouse')}>
          <span className="flex items-center gap-1.5">
            <Boxes className="text-muted-foreground size-3.5 shrink-0" />
            {order.warehouse_id}
          </span>
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelTotalAmount')}>
          <span className="text-xl font-bold tabular-nums">
            {formatPrice(order.total_amount, i18n.language)}
          </span>
        </DetailCell>
        <DetailCell label={t('labelTotalQuantity')}>
          <span className="flex items-center gap-1.5">
            <Package className="text-muted-foreground size-3.5 shrink-0" />
            <span className="tabular-nums">{order.total_quantity}</span>
            <span className="text-muted-foreground text-xs font-normal">
              {t('units')}
            </span>
          </span>
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelCreatedAt')} className="min-w-0">
          <SplitDateTime date={order.created_at} icon={CalendarDays} />
        </DetailCell>

        <DetailCell label={t('labelUpdatedAt')} className="min-w-0">
          <SplitDateTime date={order.updated_at} icon={RefreshCw} />
        </DetailCell>
      </div>
    </DetailCard>
  );
}
