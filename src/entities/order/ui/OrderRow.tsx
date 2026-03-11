import type { Order } from '../model/orderTypes';
import { TableCell, TableActions, TableRow } from '@/shared/ui';

type OrderRowProps = {
  order: Order;
  onDelete: (Order: Order) => void;
};

export function OrderRow({ order, onDelete }: OrderRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{order.id}</TableCell>
      <TableCell>{order.warehouseId}</TableCell>
      <TableCell>{order.pharmacyName}</TableCell>
      <TableCell>{order.items}</TableCell>

      <TableActions
        item={order}
        itemId={order.id}
        onDelete={onDelete}
        path="/dashboard/orders"
      >
        <TableActions.Detail />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}
