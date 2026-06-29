import { useTranslation } from 'react-i18next';
import { TruckElectric } from 'lucide-react';

import { DeliveryRow, type DeliveryListResponse } from '@/entities/delivery';
import { TableHead, TableEmptyState, EntityListTable } from '@/shared/ui';

type Props = { data: DeliveryListResponse };

export function DeliveriesTable({ data }: Props) {
  const { t } = useTranslation('deliveries');

  return (
    <EntityListTable
      data={data}
      title={t('list.all')}
      icon={TruckElectric}
      addHref="/dashboard/deliveries/assign"
      addLabel={t('list.assign')}
      basePath="/dashboard/deliveries"
      columns={
        <>
          <TableHead className="w-25">{t('list.id')}</TableHead>
          <TableHead>{t('list.pharmacyName')}</TableHead>
          <TableHead>{t('list.distributorName')}</TableHead>
          <TableHead>{t('list.scheduledAt')}</TableHead>
          <TableHead>{t('list.status')}</TableHead>
          <TableHead>{t('list.paymentStatus')}</TableHead>
          <TableHead>{t('list.paymentAmount')}</TableHead>
          <TableHead>{t('list.totalItems')}</TableHead>
          <TableHead>{t('list.actions')}</TableHead>
        </>
      }
      renderRow={(delivery) => (
        <DeliveryRow key={delivery.id} delivery={delivery} />
      )}
      emptyState={<TableEmptyState variant="empty" />}
    />
  );
}
