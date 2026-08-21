import { memo } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Ban, ClipboardEdit, Tag } from 'lucide-react';

import { OrderStatusBadge, type OrderListItem } from '@/entities/order';
import { formatDate, formatPrice } from '@/shared/lib';
import {
  TableCell,
  TableActions,
  TableRow,
  DropdownMenuItem,
} from '@/shared/ui';

export type OrderRowActionAccess = Readonly<{
  canCancel: boolean;
  canChangeStatus: boolean;
  canUpdate: boolean;
}>;

type OrderRowProps = {
  order: OrderListItem;
  actionAccess: OrderRowActionAccess;
};

export const OrderRow = memo(function OrderRow({
  order,
  actionAccess,
}: OrderRowProps) {
  const { t, i18n } = useTranslation('orders');

  const hasDiscount =
    order.offer_id !== null && Number.parseFloat(order.discount) > 0;

  const isTerminalStatus =
    order.status === 'completed' || order.status === 'cancelled';

  const canChangeStatus = actionAccess.canChangeStatus && !isTerminalStatus;

  const canCancel = actionAccess.canCancel && !isTerminalStatus;
  const canUpdate = actionAccess.canUpdate && !isTerminalStatus;

  return (
    <TableRow>
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
              <Tag className="size-2.5 shrink-0" aria-hidden="true" />

              <span className="tabular-nums line-through">
                {formatPrice(order.total_amount, i18n.language)}
              </span>

              {order.percentage !== null ? (
                <span className="text-badge-success-text/80">
                  −{order.percentage}%
                </span>
              ) : null}
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

        {canUpdate ? <TableActions.Update /> : null}

        {canChangeStatus ? (
          <ChangeStatusAction
            orderId={order.id}
            label={t('list.changeStatus')}
          />
        ) : null}

        {canCancel ? (
          <CancelOrderAction
            orderId={order.id}
            label={t('cancelOrder.trigger')}
          />
        ) : null}
      </TableActions>
    </TableRow>
  );
});

type ActionProps = {
  orderId: number;
  label: string;
};

function ChangeStatusAction({ orderId, label }: ActionProps) {
  return (
    <DropdownMenuItem asChild>
      <Link
        to={`/dashboard/orders/${orderId}?focus=change-status`}
        className="cursor-pointer"
      >
        <ClipboardEdit className="size-4" aria-hidden="true" />
        <span>{label}</span>
      </Link>
    </DropdownMenuItem>
  );
}

function CancelOrderAction({ orderId, label }: ActionProps) {
  return (
    <DropdownMenuItem variant="destructive" asChild>
      <Link
        to={`/dashboard/orders/${orderId}?focus=cancel-order`}
        className="cursor-pointer"
      >
        <Ban className="size-4" aria-hidden="true" />
        <span>{label}</span>
      </Link>
    </DropdownMenuItem>
  );
}
