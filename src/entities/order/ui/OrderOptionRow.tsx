import { memo, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

import { cn, formatDate, formatPrice } from '@/shared/lib';
import { Badge, Skeleton } from '@/shared/ui';

import type { OrderListItem } from '../model/orderTypes';

type Props = { order: OrderListItem; selected: boolean };

type BadgeVariant = 'muted' | 'info' | 'destructive' | 'success';

const STATUS_VARIANT: Record<OrderListItem['status'], BadgeVariant> = {
  pending: 'muted',
  processing: 'info',
  cancelled: 'destructive',
  completed: 'success',
};

function OrderOptionRowImpl({ order, selected }: Props) {
  const { i18n } = useTranslation();

  const orderCode = `ORD-${String(order.id).padStart(6, '0')}`;

  return (
    <div className="flex w-full min-w-0 items-center gap-2.5">
      <Check
        aria-hidden
        className={cn(
          'size-4 shrink-0',
          selected ? 'opacity-100' : 'opacity-0',
        )}
      />

      <span className="flex min-w-0 flex-1 flex-col text-start">
        <span className="truncate text-sm font-medium">{orderCode}</span>
        <span className="text-muted-foreground truncate text-xs">
          {order.pharmacy.name} ·{' '}
          {formatDate(order.created_at, i18n.language, false)}
        </span>
      </span>

      <span className="flex shrink-0 flex-col items-end gap-1">
        <Suspense
          fallback={<Skeleton className="h-4.5 w-15.5 rounded-full! border" />}
        >
          <OrderSimpleBadge order={order} />
        </Suspense>
        <span className="text-xs font-semibold tabular-nums">
          {formatPrice(order.final_total, i18n.language)}
        </span>
      </span>
    </div>
  );
}

function OrderSimpleBadge({ order }: Omit<Props, 'selected'>) {
  const { t } = useTranslation('orders', { keyPrefix: 'status' });

  return (
    <Badge
      variant={STATUS_VARIANT[order.status]}
      className="h-4.5 px-1.5 text-[10px] font-normal"
    >
      {t(order.status, { defaultValue: order.status })}
    </Badge>
  );
}

export const OrderOptionRow = memo(OrderOptionRowImpl);
