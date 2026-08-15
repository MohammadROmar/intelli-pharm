import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import {
  ArrowUpRight,
  CalendarDays,
  PackageSearch,
  Package,
  Tag,
} from 'lucide-react';

import { OrderStatusBadge } from '@/entities/order';
import type { DebtOrder } from '@/entities/debt';
import { formatPrice } from '@/shared/lib';
import {
  BadgeLink,
  Button,
  DetailCard,
  DetailEmptyState,
  SplitDateTime,
} from '@/shared/ui';

type Props = {
  orders: DebtOrder[];
  canViewOffer: boolean;
  canViewOrder: boolean;
};

export function DebtOrders({ orders, canViewOffer, canViewOrder }: Props) {
  const { t, i18n } = useTranslation('debt-detail', {
    keyPrefix: 'detail',
  });

  return (
    <DetailCard
      title={t('sections.orders')}
      subtitle={t('sections.ordersSubtitle')}
      icon={Package}
      itemsCount={orders.length}
    >
      {orders.length === 0 ? (
        <DetailEmptyState label={t('orders.empty')} icon={PackageSearch} />
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {orders.map((order) => (
            <DebtOrderCard
              key={order.id}
              order={order}
              language={i18n.language}
              canViewOffer={canViewOffer}
              canViewOrder={canViewOrder}
            />
          ))}
        </div>
      )}
    </DetailCard>
  );
}

type DebtOrderCardProps = {
  order: DebtOrder;
  language: string;
  canViewOffer: boolean;
  canViewOrder: boolean;
};

function DebtOrderCard({
  order,
  language,
  canViewOffer,
  canViewOrder,
}: DebtOrderCardProps) {
  const { t } = useTranslation('debt-detail', {
    keyPrefix: 'detail.orders',
  });
  const orderCode = `ORD-${String(order.id).padStart(6, '0')}`;

  return (
    <article className="bg-card rounded-xl border p-4 [contain-intrinsic-size:248px] [content-visibility:auto]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold tabular-nums">{orderCode}</p>
          <div className="mt-2">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        {canViewOrder ? (
          <Button variant="ghost" size="icon" className="size-11!" asChild>
            <Link
              to={`/dashboard/orders/${order.id}`}
              aria-label={t('viewOrder')}
            >
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        ) : null}
      </div>

      <div className="my-4 grid grid-cols-3 gap-3 border-y py-3">
        <OrderMetric
          label={t('finalTotal')}
          value={formatPrice(String(order.final_total), language)}
        />
        <OrderMetric
          label={t('paidAmount')}
          value={formatPrice(String(order.paid_amount), language)}
        />
        <OrderMetric
          label={t('remaining')}
          value={formatPrice(
            String(Math.max(order.remainingAmount, 0)),
            language,
          )}
          alignEnd
          strong
        />
      </div>

      <div className="space-y-3">
        {order.discount > 0 ? (
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">{t('discount')}</span>
            <span className="font-medium tabular-nums">
              −{formatPrice(String(order.discount), language)}
            </span>
          </div>
        ) : null}

        {order.offer_id !== null ? (
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">{t('offer')}</span>
            <BadgeLink
              label={`OFF-${String(order.offer_id).padStart(6, '0')}`}
              to={
                canViewOffer
                  ? `/dashboard/promotions/offers/${order.offer_id}`
                  : undefined
              }
              icon={Tag}
            />
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-muted-foreground">{t('createdAt')}</span>
          <SplitDateTime date={order.created_at} icon={CalendarDays} />
        </div>
      </div>
    </article>
  );
}

function OrderMetric({
  label,
  value,
  alignEnd = false,
  strong = false,
}: {
  label: string;
  value: string;
  alignEnd?: boolean;
  strong?: boolean;
}) {
  return (
    <div className={alignEnd ? 'min-w-0 text-end' : 'min-w-0'}>
      <p className="text-muted-foreground text-xs">{label}</p>
      <p
        className={
          strong
            ? 'text-primary mt-1 text-sm font-bold wrap-break-word tabular-nums'
            : 'mt-1 text-sm font-semibold wrap-break-word tabular-nums'
        }
      >
        {value}
      </p>
    </div>
  );
}
