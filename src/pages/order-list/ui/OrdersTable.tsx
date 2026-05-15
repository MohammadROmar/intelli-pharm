import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderFiltersModal } from './OrderFiltersModal';
import { useOrderFilters } from '../model/useOrderFilters';
import { OrderRow, type OrderListResponse } from '@/entities/order';
import {
  FiltersTrigger,
  TableBody,
  TableCard,
  TableEmptyState,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

type Props = { data: OrderListResponse };

export function OrdersTable({ data }: Props) {
  const { t } = useTranslation('orders', { keyPrefix: 'list' });

  const orders = data.data;

  return (
    <TableCard
      title={t('all')}
      basePath="/dashboard/orders"
      toolbar={<OrderFilters />}
      itemsPerPage={data.meta.per_page}
      currItemsCount={orders.length}
      currentPage={data.meta.current_page}
      totalItems={data.meta.total}
    >
      {orders.length > 0 ? (
        <>
          <TableHeader>
            <TableRow>
              <TableHead className="w-30">{t('id')}</TableHead>
              <TableHead>{t('pharmacyName')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead>{t('totalQuantity')}</TableHead>
              <TableHead>{t('totalAmount')}</TableHead>
              <TableHead>{t('created')}</TableHead>
              <TableHead>{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </TableBody>
        </>
      ) : (
        <EmptyState />
      )}
    </TableCard>
  );
}

function OrderFilters() {
  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    useOrderFilters();

  return (
    <>
      <FiltersTrigger onClick={() => setOpen(true)} activeCount={activeCount} />
      <OrderFiltersModal
        open={open}
        onOpenChange={setOpen}
        defaultValues={filters}
        hasActiveFilters={hasActiveFilters}
        onApply={(v) => {
          applyFilters(v);
          setOpen(false);
        }}
        onClear={() => {
          clearFilters();
          setOpen(false);
        }}
      />
    </>
  );
}

function EmptyState() {
  const { hasActiveFilters, clearFilters } = useOrderFilters();

  return (
    <TableEmptyState
      variant={hasActiveFilters ? 'search' : 'empty'}
      onClearSearch={clearFilters}
    />
  );
}
