import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useHasPermission } from '@/entities/session';
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

  const canChangeStatus = useHasPermission('erp.orders.update');

  const renderRow = useCallback(
    (order: OrderListResponse['data'][number]) => (
      <OrderRow
        key={order.id}
        order={order}
        canChangeStatus={canChangeStatus}
      />
    ),
    [canChangeStatus],
  );

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
          <TableHead>{t('pharmacyName')}</TableHead>
          <TableHead>{t('status')}</TableHead>
          <TableHead>{t('totalAmount')}</TableHead>
          <TableHead>{t('totalQuantity')}</TableHead>
          <TableHead>{t('created')}</TableHead>
          <TableHead>{t('actions')}</TableHead>
        </>
      }
      renderRow={renderRow}
      emptyState={
        <EntityEmptyState
          hasActiveFilters={filtersState.hasActiveFilters}
          clearFilters={filtersState.clearFilters}
        />
      }
    />
  );
}
