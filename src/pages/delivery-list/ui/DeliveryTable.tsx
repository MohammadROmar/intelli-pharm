import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TruckElectric } from 'lucide-react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';
import type { DeliveryListResponse } from '@/entities/delivery';
import { TableHead, TableEmptyState, EntityListTable } from '@/shared/ui';

import { DeliveryRow, type DeliveryRowActionAccess } from './DeliveryRow';

type Props = { data: DeliveryListResponse };

export function DeliveriesTable({ data }: Props) {
  const { t } = useTranslation('deliveries');
  const grantedPermissions = useGrantedPermissions();

  const canViewDetails = hasPermission(
    grantedPermissions,
    'planner.deliveries.view',
  );
  const canChangeStatus = hasPermission(
    grantedPermissions,
    'planner.deliveries.update',
  );
  const canAssign = hasPermission(
    grantedPermissions,
    'planner.deliveries.create',
  );

  const actionAccess = useMemo<DeliveryRowActionAccess>(
    () => ({
      canViewDetails,
      canChangeStatus,
      hasAnyRowAction: canViewDetails || canChangeStatus,
    }),
    [canChangeStatus, canViewDetails],
  );

  const renderRow = useCallback(
    (delivery: DeliveryListResponse['data'][number]) => (
      <DeliveryRow
        key={delivery.id}
        delivery={delivery}
        actionAccess={actionAccess}
      />
    ),
    [actionAccess],
  );

  return (
    <EntityListTable
      data={data}
      title={t('list.all')}
      addButton={
        canAssign
          ? {
              addHref: '/dashboard/deliveries/assign',
              addLabel: t('list.assign'),
              icon: TruckElectric,
            }
          : undefined
      }
      basePath="/dashboard/deliveries"
      columns={
        <>
          <TableHead>{t('list.pharmacyName')}</TableHead>
          <TableHead>{t('list.distributorName')}</TableHead>
          <TableHead>{t('list.scheduledAt')}</TableHead>
          <TableHead>{t('list.status')}</TableHead>
          <TableHead>{t('list.paymentStatus')}</TableHead>
          <TableHead>{t('list.paymentAmount')}</TableHead>
          <TableHead>{t('list.totalItems')}</TableHead>
          {actionAccess.hasAnyRowAction ? (
            <TableHead>{t('list.actions')}</TableHead>
          ) : null}
        </>
      }
      renderRow={renderRow}
      emptyState={<TableEmptyState variant="empty" />}
    />
  );
}
