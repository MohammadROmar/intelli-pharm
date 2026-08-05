import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ClipboardEdit, Tag } from 'lucide-react';

import { OrderStatusBadge, type OrderListItem } from '@/entities/order';
import { formatDate, formatPrice } from '@/shared/lib';
import {
  TableCell,
  TableActions,
  TableRow,
  DropdownMenuItem,
} from '@/shared/ui';

type OrderRowProps = { order: OrderListItem };

export function OrderRow({ order }: OrderRowProps) {
  const { t, i18n } = useTranslation('orders', {
    keyPrefix: 'list',
  });

  const hasDiscount = order.offer_id !== null && parseFloat(order.discount) > 0;

  return (
    <TableRow>
      <TableCell className="text-muted-foreground font-mono text-xs">
        {order.id}
      </TableCell>

      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">
          {order.pharmacy.name}
        </p>
      </TableCell>

      <TableCell>
        <OrderStatusBadge status={order.status} withIcon={false} />
      </TableCell>

      <TableCell>
        {hasDiscount ? (
          <div className="flex flex-col gap-0.5">
            <span className="font-medium tabular-nums">
              {formatPrice(order.final_total, i18n.language)}
            </span>
            <span className="text-muted-foreground flex items-center gap-1 text-xs">
              <Tag className="size-2.5 shrink-0" />
              <span className="tabular-nums line-through">
                {formatPrice(order.total_amount, i18n.language)}
              </span>
              {order.percentage !== null && (
                <span className="text-badge-success-text/80">
                  −{order.percentage}%
                </span>
              )}
            </span>
          </div>
        ) : (
          <span className="tabular-nums">
            {formatPrice(order.total_amount, i18n.language)}
          </span>
        )}
      </TableCell>

      <TableCell className="tabular-nums">
        {order.total_quantity ?? 0}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatDate(order.created_at, i18n.language, false)}
      </TableCell>

      <TableActions item={order} itemId={order.id} path="/dashboard/orders">
        <TableActions.Detail />
        <ChangeStatus order={order} label={t('changeStatus')} />
      </TableActions>
    </TableRow>
  );
}

type Props = OrderRowProps & { label: string };

function ChangeStatus({ order, label }: Props) {
  return (
    <DropdownMenuItem asChild>
      <Link
        to={`/dashboard/orders/${order.id}?focus=change-status`}
        className="cursor-pointer"
      >
        <ClipboardEdit className="size-4" />
        <span>{label}</span>
      </Link>
    </DropdownMenuItem>
  );
}
