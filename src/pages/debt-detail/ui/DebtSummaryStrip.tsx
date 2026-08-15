import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Banknote,
  CalendarClock,
  CircleDollarSign,
  CircleGauge,
  WalletCards,
} from 'lucide-react';

import type { DebtDetail } from '@/entities/debt';
import { formatDate, formatPrice } from '@/shared/lib';

type Props = { debt: DebtDetail };

export function DebtSummaryStrip({ debt }: Props) {
  const { t, i18n } = useTranslation('debt-detail', {
    keyPrefix: 'detail.summary',
  });

  const percentage = Number.isFinite(debt.paid_percentage)
    ? Math.max(debt.paid_percentage, 0)
    : 0;
  const progress = Math.min(percentage, 100);
  const overpaidAmount = Math.max(debt.paid_amount - debt.amount, 0);
  const hasOverpayment = overpaidAmount >= 0.005;
  const percentageLabel = `${percentage.toLocaleString(i18n.language, {
    maximumFractionDigits: 2,
  })}%`;

  return (
    <section
      aria-label={t('ariaLabel')}
      className="bg-card overflow-hidden rounded-2xl border shadow-sm"
    >
      <div className="grid sm:grid-cols-2 xl:grid-cols-4">
        <SummaryItem icon={CircleDollarSign} label={t('totalDebt')}>
          {formatPrice(String(debt.amount), i18n.language)}
        </SummaryItem>
        <SummaryItem icon={WalletCards} label={t('paidAmount')}>
          {formatPrice(String(debt.paid_amount), i18n.language)}
        </SummaryItem>
        <SummaryItem
          icon={Banknote}
          label={hasOverpayment ? t('creditBalance') : t('remainingAmount')}
          emphasized
        >
          {formatPrice(
            String(hasOverpayment ? overpaidAmount : debt.remaining_amount),
            i18n.language,
          )}
        </SummaryItem>
        <SummaryItem icon={CalendarClock} label={t('dueDate')}>
          {formatDate(debt.due_date, i18n.language)}
        </SummaryItem>
      </div>

      <div className="bg-muted/20 border-t p-4 sm:p-5">
        <div className="mb-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CircleGauge
              className="text-muted-foreground size-4"
              aria-hidden="true"
            />
            {t('collectionProgress')}
          </div>
          <span className="font-bold tabular-nums">{percentageLabel}</span>
        </div>

        <div
          className="bg-muted h-2 overflow-hidden rounded-full"
          role="progressbar"
          aria-label={t('collectionProgress')}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-valuetext={percentageLabel}
        >
          <div
            className="bg-primary h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        {hasOverpayment ? (
          <p className="text-primary mt-3 text-sm font-medium">
            {t('overpaymentNotice', {
              amount: formatPrice(String(overpaidAmount), i18n.language),
            })}
          </p>
        ) : null}
      </div>
    </section>
  );
}

type SummaryItemProps = {
  icon: typeof Banknote;
  label: string;
  children: ReactNode;
  emphasized?: boolean;
};

function SummaryItem({
  icon: Icon,
  label,
  children,
  emphasized = false,
}: SummaryItemProps) {
  return (
    <div className="flex min-w-0 items-start gap-3 border-b p-4 last:border-b-0 sm:odd:border-e sm:nth-3:border-b-0 xl:border-e xl:border-b-0 xl:last:border-e-0">
      <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div className="min-w-0 space-y-1">
        <p className="text-muted-foreground text-xs font-medium">{label}</p>
        <div
          className={
            emphasized
              ? 'text-primary text-sm font-bold wrap-break-word tabular-nums'
              : 'text-sm font-semibold wrap-break-word tabular-nums'
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
