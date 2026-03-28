import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { OrderRow, type Order } from '@/entities/order';
import {
  PageTitle,
  TableBody,
  TableCard,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';
import { dummyOrders } from '@/entities/order/model/dummyOrders';
import { DeleteOrderModal } from '@/features/order-delete';

export default function OrdersListPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'ordersPage.list' });

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  return (
    <>
      <DeleteOrderModal
        order={orderToDelete}
        onClose={() => setOrderToDelete(null)}
      />

      <PageTitle title={t('title')} subtitle={t('subtitle')} />

      <TableCard
        title={t('all')}
        basePath="/dashboard/orders"
        itemsPerPage={10}
        currentPage={parseInt(page ?? '1')}
        totalItems={200}
      >
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">{t('id')}</TableHead>
            <TableHead>{t('warehouse')}</TableHead>
            <TableHead>{t('pharmacyName')}</TableHead>
            <TableHead>{t('itemsCount')}</TableHead>
            <TableHead>{t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyOrders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              onDelete={setOrderToDelete}
            />
          ))}
        </TableBody>
      </TableCard>
    </>
  );
}
