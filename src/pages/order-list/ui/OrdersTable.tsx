import { useTranslation } from 'react-i18next';

import { OrderRow, type OrderListResponse } from '@/entities/order';
import {
  TableBody,
  TableCard,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

type Props = { data: OrderListResponse };

export function OrdersTable({ data }: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'ordersPage.list' });

  const orders = data.data!;

  return (
    <TableCard
      title={t('all')}
      basePath="/dashboard/orders"
      itemsPerPage={data.meta.per_page}
      currItemsCount={orders.length}
      currentPage={data.meta.current_page}
      totalItems={data.meta.total}
    >
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">{t('id')}</TableHead>
          <TableHead>{t('pharmacyName')}</TableHead>
          <TableHead>{t('status')}</TableHead>
          <TableHead>{t('totalAmount')}</TableHead>
          <TableHead>{t('totalQuantity')}</TableHead>
          <TableHead>{t('created')}</TableHead>
          <TableHead>{t('actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))}
      </TableBody>
    </TableCard>
  );
}
