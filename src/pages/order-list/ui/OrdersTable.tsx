import { useTranslation } from 'react-i18next';

import type { OrderListResponse } from '@/entities/order';
import {
  TableHead,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

import { OrderRow } from './OrderRow';
import { OrderFiltersModal } from './OrderFiltersModal';
import { useOrderFilters } from '../model/useOrderFilters';

type Props = { data: OrderListResponse };

export function OrdersTable({ data }: Props) {
  const { t } = useTranslation('orders', { keyPrefix: 'list' });
  const filtersState = useOrderFilters();

  return (
    <EntityListTable
      data={data}
      title={t('all')}
      basePath="/dashboard/orders"
      toolbar={
        <EntityFiltersToolbar
          filtersState={filtersState}
          FiltersModal={OrderFiltersModal}
        />
      }
      columns={
        <>
          <TableHead className="w-30">{t('id')}</TableHead>
          <TableHead>{t('pharmacyName')}</TableHead>
          <TableHead>{t('status')}</TableHead>
          <TableHead>{t('totalQuantity')}</TableHead>
          <TableHead>{t('totalAmount')}</TableHead>
          <TableHead>{t('created')}</TableHead>
          <TableHead>{t('actions')}</TableHead>
        </>
      }
      renderRow={(order) => <OrderRow key={order.id} order={order} />}
      emptyState={
        <EntityEmptyState
          hasActiveFilters={filtersState.hasActiveFilters}
          clearFilters={filtersState.clearFilters}
        />
      }
    />
  );
}
