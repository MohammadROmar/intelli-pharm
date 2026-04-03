import { Link } from 'react-router-dom';
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
import { formatDate, formatPrice } from '@/shared/lib';
import { Badge, DetailCard, DetailCell, Separator } from '@/shared/ui';

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
          <Badge asChild variant="secondary">
            <Link to={`/dashboard/pharmacies/${order.pharmacy.id}`}>
              <Cross />
              {order.pharmacy.name}
            </Link>
          </Badge>
        </DetailCell>
        <DetailCell label={t('labelWarehouse')}>
          <span className="flex items-center gap-1.5">
            <Boxes className="text-muted-foreground size-4 shrink-0" />
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
            <Package className="text-muted-foreground size-4 shrink-0" />
            <span className="tabular-nums">{order.total_quantity}</span>
            <span className="text-muted-foreground text-xs font-normal">
              {t('units')}
            </span>
          </span>
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelCreatedAt')}>
          <span className="flex items-center gap-1.5 font-normal">
            <CalendarDays className="text-muted-foreground size-3.5 shrink-0" />
            {formatDate(order.created_at, i18n.language)}
          </span>
        </DetailCell>
        <DetailCell label={t('labelUpdatedAt')}>
          <span className="flex items-center gap-1.5 font-normal">
            <RefreshCw className="text-muted-foreground size-3.5 shrink-0" />
            {formatDate(order.updated_at, i18n.language)}
          </span>
        </DetailCell>
      </div>
    </DetailCard>
  );
}
