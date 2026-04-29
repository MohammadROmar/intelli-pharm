import { useTranslation } from 'react-i18next';

import { DeliveryRow, type DeliveryListResponse } from '@/entities/delivery';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  TableEmptyState,
} from '@/shared/ui';

type Props = { data: DeliveryListResponse };

export function DeliveriesTable({ data }: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'deliveriesPage' });

  const deliveries = data.data;

  return (
    <TableCard
      title={t('list.all')}
      currItemsCount={deliveries.length}
      basePath="/dashboard/deliveries"
      currentPage={data.meta.current_page}
      totalItems={data.meta.total}
      itemsPerPage={data.meta.per_page}
    >
      {deliveries.length > 0 ? (
        <>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">{t('list.id')}</TableHead>
              <TableHead>{t('list.pharmacyName')}</TableHead>
              <TableHead>{t('list.distributorName')}</TableHead>
              <TableHead>{t('list.scheduledAt')}</TableHead>
              <TableHead>{t('list.status')}</TableHead>
              <TableHead>{t('list.paymentStatus')}</TableHead>
              <TableHead>{t('list.paymentAmount')}</TableHead>
              <TableHead>{t('list.totalItems')}</TableHead>
              <TableHead>{t('list.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveries.map((delivery) => (
              <DeliveryRow key={delivery.id} delivery={delivery} />
            ))}
          </TableBody>
        </>
      ) : (
        <TableEmptyState variant="empty" />
      )}
    </TableCard>
  );
}
