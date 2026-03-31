import { useTranslation } from 'react-i18next';
import type { OrderListItem } from '../model/orderTypes';
import { formatDate } from '@/shared/lib';
import { TableCell, TableActions, TableRow } from '@/shared/ui';
import { OrderStatusBadge } from './OrderStatusBadge';

type OrderRowProps = { order: OrderListItem };

export function OrderRow({ order }: OrderRowProps) {
  const { i18n } = useTranslation();

  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{order.id}</TableCell>
      <TableCell>{order.pharmacy.name}</TableCell>
      <TableCell>
        <OrderStatusBadge status={order.status} withIcon={false} />
      </TableCell>
      <TableCell>{order.total_amount}</TableCell>
      <TableCell>{order.total_quantity}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(order.created_at, i18n.language, false)}
      </TableCell>

      <TableActions item={order} itemId={order.id} path="/dashboard/orders">
        <TableActions.Detail />
      </TableActions>
    </TableRow>
  );
}
