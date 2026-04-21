import { useTranslation } from 'react-i18next';

import {
  type DeliveryDetail,
  DeliveryStatusBadge,
  DeliveryPaymentStatusBadge,
} from '@/entities/delivery';

type Props = { delivery: DeliveryDetail };

export function DeliveryDetailHeader({ delivery }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'deliveriesPage.detail',
  });

  return (
    <div className="space-y-2.5">
      <h1 className="text-2xl font-bold tracking-tight">
        {t('deliveryNo', { id: delivery.id })}
      </h1>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
            {t('fields.status')}
          </span>
          <DeliveryStatusBadge status={delivery.status} />
        </div>

        <div className="bg-border h-4 w-px shrink-0" />

        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
            {t('fields.paymentStatus')}
          </span>
          <DeliveryPaymentStatusBadge status={delivery.payment_status} />
        </div>
      </div>
    </div>
  );
}
