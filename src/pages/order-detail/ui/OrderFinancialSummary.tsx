import { useTranslation } from 'react-i18next';
import { Banknote } from 'lucide-react';

import type { OrderDetail } from '@/entities/order';
import { formatPrice } from '@/shared/lib';
import { DetailCard, Separator } from '@/shared/ui';

type Props = { order: OrderDetail };

export function OrderFinancialSummary({ order }: Props) {
  const { t, i18n } = useTranslation('order-detail', {
    keyPrefix: 'detail',
  });
  const hasDiscount = Number(order.discount) > 0;
  const hasPaymentData =
    order.paid_amount !== null && order.paid_amount !== undefined;
  const remainingBalance = hasPaymentData
    ? Math.max(Number(order.final_total) - Number(order.paid_amount), 0)
    : null;

  return (
    <DetailCard
      title={t('sections.financial')}
      subtitle={t('sections.financialSubtitle')}
      icon={Banknote}
    >
      <div className="border-primary/20 bg-primary/5 rounded-xl border p-4">
        <p className="text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
          {t('fields.finalTotal')}
        </p>
        <p className="text-primary mt-2 text-2xl leading-tight font-bold wrap-break-word tabular-nums">
          {formatPrice(order.final_total, i18n.language)}
        </p>
      </div>

      <Separator />

      <div className="space-y-3">
        <AmountRow
          label={t('fields.subtotal')}
          value={formatPrice(order.total_amount, i18n.language)}
        />

        {hasDiscount ? (
          <AmountRow
            label={
              order.percentage
                ? t('fields.discountWithPercentage', {
                    percentage: Number(order.percentage).toLocaleString(
                      i18n.language,
                    ),
                  })
                : t('fields.discount')
            }
            value={`−${formatPrice(order.discount, i18n.language)}`}
            emphasized
          />
        ) : null}

        {hasPaymentData ? (
          <>
            <Separator />
            <AmountRow
              label={t('fields.paidAmount')}
              value={formatPrice(order.paid_amount ?? '0', i18n.language)}
            />
            <AmountRow
              label={t('fields.remainingBalance')}
              value={formatPrice(String(remainingBalance ?? 0), i18n.language)}
              strong
            />
          </>
        ) : null}
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
