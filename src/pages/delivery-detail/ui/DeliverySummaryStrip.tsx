import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Banknote, Building2, CalendarClock, Package } from 'lucide-react';

import type { DeliveryDetail } from '@/entities/delivery';
import { formatPrice } from '@/shared/lib';
import { SplitDateTime } from '@/shared/ui';

type Props = { delivery: DeliveryDetail };

export function DeliverySummaryStrip({ delivery }: Props) {
  const { t, i18n } = useTranslation('delivery-detail', {
    keyPrefix: 'detail.summary',
  });

  return (
    <section
      aria-label={t('ariaLabel')}
      className="bg-card grid overflow-hidden rounded-2xl border shadow-sm sm:grid-cols-2 xl:grid-cols-4"
    >
      <SummaryItem icon={Building2} label={t('pharmacy')}>
        <span className="font-semibold">{delivery.pharmacy_name}</span>
      </SummaryItem>

      <SummaryItem icon={CalendarClock} label={t('scheduledAt')}>
        <SplitDateTime date={delivery.scheduled_at} icon={CalendarClock} />
      </SummaryItem>

      <SummaryItem icon={Package} label={t('units')}>
        <span className="font-semibold tabular-nums">
          {delivery.number_of_items.toLocaleString(i18n.language)}
        </span>
      </SummaryItem>

      <SummaryItem icon={Banknote} label={t('amountToCollect')}>
        <span className="text-primary font-bold tabular-nums">
          {formatPrice(delivery.required_payment_amount, i18n.language)}
        </span>
      </SummaryItem>
    </section>
  );
}

type SummaryItemProps = {
  icon: typeof Building2;
  label: string;
  children: ReactNode;
};

function SummaryItem({ icon: Icon, label, children }: SummaryItemProps) {
  return (
    <div className="flex min-w-0 items-start gap-3 border-b p-4 last:border-b-0 sm:odd:border-e sm:nth-2:border-b-0 xl:border-e xl:border-b-0 xl:last:border-e-0">
      <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div className="min-w-0 space-y-1">
        <p className="text-muted-foreground text-xs font-medium">{label}</p>
        <div className="min-w-0 text-sm">{children}</div>
      </div>
    </div>
  );
}
