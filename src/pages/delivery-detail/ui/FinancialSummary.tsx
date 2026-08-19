import { useTranslation } from 'react-i18next';
import { Banknote, CircleCheck } from 'lucide-react';

import type { DeliveryDetail } from '@/entities/delivery';
import { cn, formatPrice } from '@/shared/lib';
import { DetailCard, Separator, DetailAmountRow } from '@/shared/ui';

import { calculateRequiredPaymentAmount } from '../lib/calculateRequiredPaymentAmount';

type Props = { delivery: DeliveryDetail };

export function FinancialSummary({ delivery }: Props) {
  const { t, i18n } = useTranslation('delivery-detail', {
    keyPrefix: 'detail',
  });
  const { order } = delivery;
  const hasDiscount = Number(order.discount) > 0;
  const requiredPaymentAmount = calculateRequiredPaymentAmount(order);
  const isSettled = requiredPaymentAmount <= 0;

  return (
    <DetailCard
      title={t('sections.financial')}
      subtitle={t('sections.financialSubtitle')}
      icon={Banknote}
    >
      <div
        className={cn(
          'rounded-xl border p-4',
          isSettled
            ? 'border-muted bg-muted/40'
            : 'border-primary/20 bg-primary/5',
        )}
      >
        <p className="text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
          {isSettled
            ? t('fields.noBalanceDue')
            : t('fields.requiredPaymentAmount')}
        </p>

        {isSettled ? (
          <p className="text-foreground mt-2 flex items-center gap-2 text-2xl leading-tight font-bold">
            <CircleCheck className="text-muted-foreground size-6" />
            {t('fields.paidInFull')}
          </p>
        ) : (
          <p className="text-primary mt-2 text-2xl leading-tight font-bold wrap-break-word tabular-nums">
            {formatPrice(requiredPaymentAmount, i18n.language)}
          </p>
        )}
      </div>

      <Separator />

      <div className="space-y-3">
        <DetailAmountRow
          label={t('fields.orderSubtotal')}
          value={formatPrice(order.total_amount, i18n.language)}
        />

        {hasDiscount ? (
          <DetailAmountRow
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

        <DetailAmountRow
          label={t('fields.orderFinalTotal')}
          value={formatPrice(order.final_total, i18n.language)}
          strong
        />
        <DetailAmountRow
          label={t('fields.paidAmount')}
          value={formatPrice(order.paid_amount ?? '0', i18n.language)}
        />
      </div>
    </DetailCard>
  );
}
