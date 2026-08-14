import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Banknote, Building2, Package, RefreshCw } from 'lucide-react';

import type { OrderDetail } from '@/entities/order';
import { formatPrice } from '@/shared/lib';
import { BadgeLink, SplitDateTime } from '@/shared/ui';

type Props = {
  order: OrderDetail;
  canViewPharmacy: boolean;
};

export function OrderSummaryStrip({ order, canViewPharmacy }: Props) {
  const { t, i18n } = useTranslation('order-detail', {
    keyPrefix: 'detail.summary',
  });

  return (
    <section
      aria-label={t('ariaLabel')}
      className="bg-card grid overflow-hidden rounded-2xl border shadow-sm sm:grid-cols-2 xl:grid-cols-4"
    >
      <SummaryItem icon={Building2} label={t('pharmacy')}>
        <BadgeLink
          label={order.pharmacy.name}
          to={
            canViewPharmacy
              ? `/dashboard/pharmacies/${order.pharmacy.id}`
              : undefined
          }
          icon={Building2}
        />
      </SummaryItem>

      <SummaryItem icon={Package} label={t('units')}>
        <span className="font-semibold tabular-nums">
          {Number(order.total_quantity || 0).toLocaleString(i18n.language)}
        </span>
      </SummaryItem>

      <SummaryItem icon={Banknote} label={t('finalTotal')}>
        <span className="text-primary font-bold tabular-nums">
          {formatPrice(order.final_total, i18n.language)}
        </span>
      </SummaryItem>

      <SummaryItem icon={RefreshCw} label={t('updatedAt')}>
        <SplitDateTime date={order.updated_at} icon={RefreshCw} />
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
    <div className="flex min-w-0 items-start gap-3 border-b p-4 last:border-b-0 sm:odd:border-e sm:nth-3:border-b-0 xl:border-e xl:border-b-0 xl:last:border-e-0">
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
