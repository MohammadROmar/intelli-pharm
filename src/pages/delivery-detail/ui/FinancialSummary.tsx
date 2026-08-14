import { useTranslation } from 'react-i18next';
import { Banknote } from 'lucide-react';

import type { DeliveryDetail } from '@/entities/delivery';
import { formatPrice } from '@/shared/lib';
import { DetailCard, Separator } from '@/shared/ui';

type Props = { delivery: DeliveryDetail };

export function FinancialSummary({ delivery }: Props) {
  const { t, i18n } = useTranslation('delivery-detail', {
    keyPrefix: 'detail',
  });
  const { order } = delivery;
  const hasDiscount = Number(order.discount) > 0;

  return (
    <DetailCard
      title={t('sections.financial')}
      subtitle={t('sections.financialSubtitle')}
      icon={Banknote}
    >
      <div className="border-primary/20 bg-primary/5 rounded-xl border p-4">
        <p className="text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
          {t('fields.requiredPaymentAmount')}
        </p>
        <p className="text-primary mt-2 text-2xl leading-tight font-bold wrap-break-word tabular-nums">
          {formatPrice(delivery.required_payment_amount, i18n.language)}
        </p>
      </div>

      <Separator />

      <div className="space-y-3">
        <AmountRow
          label={t('fields.orderSubtotal')}
          value={formatPrice(order.total_amount, i18n.language)}
        />

        {hasDiscount ? (
          <AmountRow
            label={
              order.percentage
                ? t('fields.orderDiscountWithPercentage', {
                    percentage: order.percentage,
                  })
                : t('fields.orderDiscount')
            }
            value={`−${formatPrice(order.discount, i18n.language)}`}
            emphasized
          />
        ) : null}

        <Separator />

        <AmountRow
          label={t('fields.orderFinalTotal')}
          value={formatPrice(order.final_total, i18n.language)}
          strong
        />
        <AmountRow
          label={t('fields.paidAmount')}
          value={formatPrice(order.paid_amount ?? '0', i18n.language)}
        />
      </div>
    </DetailCard>
  );
}

type AmountRowProps = {
  label: string;
  value: string;
  emphasized?: boolean;
  strong?: boolean;
};

function AmountRow({
  label,
  value,
  emphasized = false,
  strong = false,
}: AmountRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span
        className={
          emphasized
            ? 'text-badge-success-text font-medium'
            : 'text-muted-foreground'
        }
      >
        {label}
      </span>
      <span
        className={
          strong
            ? 'text-end font-bold tabular-nums'
            : 'text-end font-medium tabular-nums'
        }
      >
        {value}
      </span>
    </div>
  );
}
