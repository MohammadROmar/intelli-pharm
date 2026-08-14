import { useTranslation } from 'react-i18next';
import {
  CalendarDays,
  FileText,
  Info,
  RefreshCw,
  Tag,
  User,
  Warehouse,
} from 'lucide-react';

import type { OrderDetail } from '@/entities/order';
import {
  BadgeLink,
  DetailCard,
  DetailCell,
  Separator,
  SplitDateTime,
} from '@/shared/ui';

type Props = {
  order: OrderDetail;
  canViewEmployee: boolean;
  canViewOffer: boolean;
};

export function OrderInfoCard({ order, canViewEmployee, canViewOffer }: Props) {
  const { t } = useTranslation('order-detail', {
    keyPrefix: 'detail',
  });

  return (
    <DetailCard
      title={t('sections.context')}
      subtitle={t('sections.contextSubtitle')}
      icon={Info}
    >
      <DetailCell label={t('fields.createdBy')}>
        <BadgeLink
          to={
            canViewEmployee
              ? `/dashboard/employees/${order.created_by}`
              : undefined
          }
          label={order.created_by_name}
          icon={User}
        />
      </DetailCell>

      <Separator />

      <DetailCell label={t('fields.warehouse')}>
        <BadgeLink
          label={t('fields.warehouseRecord', { id: order.warehouse_id })}
          icon={Warehouse}
        />
      </DetailCell>

      {order.offer_id !== null ? (
        <>
          <Separator />
          <DetailCell label={t('fields.offer')}>
            <BadgeLink
              label={`OFF-${String(order.offer_id).padStart(6, '0')}`}
              to={
                canViewOffer
                  ? `/dashboard/promotions/offers/${order.offer_id}`
                  : undefined
              }
              icon={Tag}
            />
          </DetailCell>
        </>
      ) : null}

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
        <DetailCell label={t('fields.createdAt')} className="min-w-0">
          <SplitDateTime date={order.created_at} icon={CalendarDays} />
        </DetailCell>
        <DetailCell label={t('fields.updatedAt')} className="min-w-0">
          <SplitDateTime date={order.updated_at} icon={RefreshCw} />
        </DetailCell>
      </div>

      <Separator />

      <div className="bg-muted/25 rounded-xl border p-4">
        <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-semibold">
          <FileText className="size-4" aria-hidden="true" />
          {t('fields.notes')}
        </div>
        <p className="text-sm leading-relaxed whitespace-break-spaces">
          {order.notes || t('fields.noNotes')}
        </p>
      </div>
    </DetailCard>
  );
}
