import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CalendarClock, MapPin, ReceiptText } from 'lucide-react';

import {
  DebtStatusBadge,
  DebtStatusIcon,
  type DebtListItem,
} from '@/entities/debt';
import { buttonVariants, cn, formatDate, formatPrice } from '@/shared/lib';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Separator,
} from '@/shared/ui';

type Props = { debt: DebtListItem };

export function DebtCard({ debt }: Props) {
  const { t, i18n } = useTranslation('debts', { keyPrefix: 'list.card' });
  const titleId = `debt-card-title-${debt.id}`;
  const percentage = Number.isFinite(debt.paid_percentage)
    ? debt.paid_percentage
    : debt.amount > 0
      ? (debt.paid_amount / debt.amount) * 100
      : 0;
  const creditBalance = Math.max(debt.paid_amount - debt.amount, 0);
  const hasCredit = creditBalance >= 0.005;
  const progress =
    debt.status === 'paid' || hasCredit
      ? 100
      : Math.min(Math.max(percentage, 0), 100);
  const progressLabel = `${progress.toLocaleString(i18n.language, {
    maximumFractionDigits: 2,
  })}%`;
  const displayedBalance = hasCredit
    ? creditBalance
    : Math.max(debt.remaining_amount, 0);
  const isOverdue = debt.status === 'overdue';

  return (
    <Card
      role="article"
      aria-labelledby={titleId}
      className="flex h-full flex-col overflow-hidden [contain-intrinsic-size:360px] [content-visibility:auto]"
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
            <DebtStatusIcon status={debt.status} />
          </div>
          <DebtStatusBadge status={debt.status} withIcon={false} />
        </div>

        <div className="mt-3">
          <h2
            id={titleId}
            className="text-foreground text-base leading-tight font-semibold"
          >
            {debt.pharmacy_name}
          </h2>
          <p className="text-muted-foreground mt-1 inline-flex items-center gap-1 text-sm">
            <MapPin className="size-3.5" aria-hidden="true" />
            {debt.region_name}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="bg-muted/40 rounded-lg px-4 py-3">
          <p className="text-muted-foreground mb-1 text-[11px] font-medium tracking-widest uppercase">
            {hasCredit ? t('creditBalance') : t('remainingBalance')}
          </p>
          <p className="text-foreground text-2xl leading-tight font-bold wrap-break-word tabular-nums">
            {formatPrice(String(displayedBalance), i18n.language)}
          </p>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between gap-3 text-xs">
            <span className="text-muted-foreground font-medium">
              {t('collectionProgress')}
            </span>
            <span className="font-bold tabular-nums">{progressLabel}</span>
          </div>
          <div
            className="bg-muted h-2 overflow-hidden rounded-full"
            role="progressbar"
            aria-label={t('collectionProgress')}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-valuetext={t('progressAriaValue', {
              percentage: progressLabel,
              paid: formatPrice(String(debt.paid_amount), i18n.language),
              total: formatPrice(String(debt.amount), i18n.language),
            })}
          >
            <div
              className="bg-primary h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
            {t('paidOfTotal', {
              paid: formatPrice(String(debt.paid_amount), i18n.language),
              total: formatPrice(String(debt.amount), i18n.language),
            })}
          </p>
        </div>

        <Separator className="my-4" />

        <dl className="grid grid-cols-2 gap-4">
          <DebtMetadata
            icon={CalendarClock}
            label={t('dueDate')}
            value={formatDate(debt.due_date, i18n.language)}
            emphasized={isOverdue}
          />
          <DebtMetadata
            icon={ReceiptText}
            label={t('lastPayment')}
            value={
              debt.last_payment
                ? formatPrice(String(debt.last_payment.amount), i18n.language)
                : t('noPayments')
            }
            supportingValue={
              debt.last_payment
                ? formatDate(debt.last_payment.payment_date, i18n.language)
                : undefined
            }
          />
        </dl>
      </CardContent>

      <CardFooter className="mt-auto flex flex-col gap-0 pt-0">
        <Separator />
        <Link
          to={`/dashboard/debts/${debt.id}`}
          aria-label={t('openAriaLabel', { pharmacy: debt.pharmacy_name })}
          className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
            className:
              'group text-muted-foreground hover:text-foreground mt-2 w-full justify-between! gap-2',
          })}
        >
          {t('viewDetails')}
          <span className="rtl:rotate-180">
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
}

type DebtMetadataProps = {
  icon: typeof CalendarClock;
  label: string;
  value: string;
  supportingValue?: string;
  emphasized?: boolean;
};

function DebtMetadata({
  icon: Icon,
  label,
  value,
  supportingValue,
  emphasized = false,
}: DebtMetadataProps) {
  return (
    <div className="min-w-0">
      <dt className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-medium">
        <Icon className="size-3.5" aria-hidden="true" />
        {label}
      </dt>
      <dd
        className={cn(
          'mt-1.5 text-xs font-semibold wrap-break-word tabular-nums',
          emphasized && 'text-destructive',
        )}
      >
        {value}
      </dd>
      {supportingValue ? (
        <dd className="text-muted-foreground mt-1 text-[11px] tabular-nums">
          {supportingValue}
        </dd>
      ) : null}
    </div>
  );
}
