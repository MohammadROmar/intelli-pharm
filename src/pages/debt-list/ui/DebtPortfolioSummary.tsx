import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import type { DebtListSummary } from '@/entities/debt';
import { cn, formatPrice } from '@/shared/lib';

type Props = { summary: DebtListSummary };

type CardAccentVars = CSSProperties & {
  '--debt-gradient-from': string;
  '--debt-gradient-to': string;
  '--debt-accent': string;
};

const CARD_ACCENT_STYLE: CardAccentVars = {
  '--debt-gradient-from': '#023E68',
  '--debt-gradient-to': '#005B60',
  '--debt-accent': 'color-mix(in oklch, var(--success), white 55%)',
};

export function DebtPortfolioSummary({ summary }: Props) {
  const { t, i18n } = useTranslation('debts', {
    keyPrefix: 'list.summary',
  });
  const paidAmount = Math.max(summary.total_paid, 0);
  const remainingAmount = Math.max(summary.total_remaining, 0);
  const trackedAmount = paidAmount + remainingAmount;
  const collectedPercentage =
    trackedAmount > 0
      ? Math.min(
          Math.max(Math.round((paidAmount / trackedAmount) * 100), 0),
          100,
        )
      : 0;
  const remainingPercentage = trackedAmount > 0 ? 100 - collectedPercentage : 0;
  const collectedPercentageLabel = collectedPercentage.toLocaleString(
    i18n.language,
  );
  const remainingPercentageLabel = remainingPercentage.toLocaleString(
    i18n.language,
  );

  return (
    <section
      aria-label={t('ariaLabel')}
      style={CARD_ACCENT_STYLE}
      className="text-primary-foreground relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,var(--debt-gradient-from),var(--debt-gradient-to))] p-5 shadow-sm sm:p-6 lg:p-7"
    >
      <div className="min-w-0 text-start">
        <p className="text-primary-foreground/70 text-sm font-medium">
          {t('remainingBalance')}
        </p>
        <p className="mt-1 text-3xl leading-tight font-bold wrap-break-word tabular-nums sm:text-4xl">
          {formatPrice(String(remainingAmount), i18n.language)}
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:gap-6">
        <SummaryValue
          label={t('totalPaid')}
          value={formatPrice(String(paidAmount), i18n.language)}
          align="start"
          accent
        />
        <SummaryValue
          label={t('totalInvoices')}
          value={formatPrice(String(summary.total_debt_amount), i18n.language)}
          align="end"
        />
      </dl>

      <div className="mt-6">
        <div
          className="bg-primary-foreground/25 flex h-2.5 overflow-hidden rounded-full"
          role="progressbar"
          aria-label={t('collectionProgress')}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={collectedPercentage}
          aria-valuetext={t('progressAriaValue', {
            collected: collectedPercentageLabel,
            remaining: remainingPercentageLabel,
          })}
        >
          <div
            className="h-full rounded-full bg-(--debt-accent) transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${collectedPercentage}%` }}
          />
        </div>

        <div className="text-primary-foreground/70 mt-2.5 flex items-center justify-between gap-4 text-xs font-medium sm:text-sm">
          <span>
            {t('collectedPercentage', {
              percentage: collectedPercentageLabel,
            })}
          </span>
          <span>
            {t('remainingPercentage', {
              percentage: remainingPercentageLabel,
            })}
          </span>
        </div>
      </div>
    </section>
  );
}

type SummaryValueProps = {
  label: string;
  value: string;
  align: 'start' | 'end';
  accent?: boolean;
};

function SummaryValue({
  label,
  value,
  align,
  accent = false,
}: SummaryValueProps) {
  const alignClass = align === 'start' ? 'text-start' : 'text-end';

  return (
    <div className={cn('min-w-0', alignClass)}>
      <dt className="text-primary-foreground/70 text-[11px] font-medium sm:text-xs">
        {label}
      </dt>
      <dd
        className={cn(
          'mt-1 text-base font-bold wrap-break-word tabular-nums sm:text-lg lg:text-xl',
          accent ? 'text-(--debt-accent)' : 'text-primary-foreground',
        )}
      >
        {value}
      </dd>
    </div>
  );
}
