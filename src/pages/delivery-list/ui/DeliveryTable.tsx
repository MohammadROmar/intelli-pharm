import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TruckElectric } from 'lucide-react';

import type { DeliveryListResponse } from '@/entities/delivery';
import {
  EntityEmptyState,
  EntityFiltersToolbar,
  EntityListTable,
  TableHead,
} from '@/shared/ui';

import { DeliveryFiltersModal } from './DeliveryFiltersModal';
import { DeliveryRow } from './DeliveryRow';
import { useDeliveryAccess } from '../model/useDeliveryAccess';
import { useDeliveryFilters } from '../model/useDeliveryFilters';

type Props = { data: DeliveryListResponse };

export function DeliveriesTable({ data }: Props) {
  const { t } = useTranslation('deliveries');

  const filtersState = useDeliveryFilters();
  const actionAccess = useDeliveryAccess();
  const { canCreate, canUpdate } = actionAccess;

  const renderRow = useCallback(
    (delivery: DeliveryListResponse['data'][number]) => (
      <DeliveryRow
        key={delivery.id}
        delivery={delivery}
        canChangeStatus={canUpdate}
      />
    ),
    [canUpdate],
  );

  return (
    <EntityListTable
      data={data}
      title={t('list.all')}
      addButton={
        canCreate
          ? {
              addHref: '/dashboard/deliveries/assign',
              addLabel: t('list.assign'),
              icon: TruckElectric,
            }
          : undefined
      }
      basePath="/dashboard/deliveries"
      toolbar={
        <EntityFiltersToolbar
          filtersState={filtersState}
          FiltersModal={DeliveryFiltersModal}
        />
      }
      columns={
        <>
          <TableHead>{t('list.pharmacyName')}</TableHead>
          <TableHead>{t('list.distributorName')}</TableHead>
          <TableHead>{t('list.scheduledAt')}</TableHead>
          <TableHead>{t('list.status')}</TableHead>
          <TableHead>{t('list.totalItems')}</TableHead>
          <TableHead>{t('list.actions')}</TableHead>
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
