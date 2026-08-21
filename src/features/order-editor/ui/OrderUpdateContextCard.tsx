import { useTranslation } from 'react-i18next';
import { Cross, FileText, LockKeyhole, Warehouse } from 'lucide-react';

import type { OrderDetail } from '@/entities/order';
import { DetailCard, DetailCell, Separator } from '@/shared/ui';

import { DEFAULT_ORDER_WAREHOUSE_ID } from '../config/warehouses';

type Props = {
  order: OrderDetail;
};

export function OrderUpdateContextCard({ order }: Props) {
  const { t } = useTranslation('order-update', { keyPrefix: 'context' });
  const warehouseName =
    String(order.warehouse_id) === DEFAULT_ORDER_WAREHOUSE_ID
      ? t('mainWarehouse')
      : t('warehouseRecord', { id: order.warehouse_id });

  return (
    <DetailCard
      title={t('title')}
      subtitle={t('subtitle')}
      icon={LockKeyhole}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <DetailCell label={t('pharmacy')}>
          <span className="flex items-center gap-2 font-medium">
            <Cross
              className="text-muted-foreground size-4 shrink-0"
              aria-hidden="true"
            />
            {order.pharmacy.name}
          </span>
        </DetailCell>

        <DetailCell label={t('warehouse')}>
          <span className="flex items-center gap-2 font-medium">
            <Warehouse
              className="text-muted-foreground size-4 shrink-0"
              aria-hidden="true"
            />
            {warehouseName}
          </span>
        </DetailCell>
      </div>

      <Separator />

      <DetailCell label={t('notes')}>
        <span className="flex items-start gap-2 font-normal whitespace-pre-wrap">
          <FileText
            className="text-muted-foreground mt-0.5 size-4 shrink-0"
            aria-hidden="true"
          />
          {order.notes || t('noNotes')}
        </span>
      </DetailCell>
    </DetailCard>
  );
}
