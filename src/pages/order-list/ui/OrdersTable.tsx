import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { hasPermission, useGrantedPermissions } from '@/entities/session';
import type { OrderListResponse } from '@/entities/order';
import {
  TableHead,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

import { OrderRow, type OrderRowActionAccess } from './OrderRow';
import { OrderFiltersModal } from './OrderFiltersModal';
import { useOrderFilters } from '../model/useOrderFilters';

type Props = { data: OrderListResponse };

export function OrdersTable({ data }: Props) {
  const { t } = useTranslation('orders', { keyPrefix: 'list' });
  const filtersState = useOrderFilters();
  const grantedPermissions = useGrantedPermissions();

  const canView = hasPermission(grantedPermissions, 'erp.orders.view');
  const canChangeStatus = hasPermission(
    grantedPermissions,
    'erp.orders.update',
  );

  const actionAccess = useMemo<OrderRowActionAccess>(
    () => ({
      canView,
      canChangeStatus,
      hasAnyRowAction: canView || canChangeStatus,
    }),
    [canChangeStatus, canView],
  );

  const renderRow = useCallback(
    (order: OrderListResponse['data'][number]) => (
      <OrderRow key={order.id} order={order} actionAccess={actionAccess} />
    ),
    [actionAccess],
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
          {actionAccess.hasAnyRowAction ? (
            <TableHead>{t('actions')}</TableHead>
          ) : null}
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
