import { memo } from 'react';
import { AlertTriangle, ClipboardList, Truck, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { StatCard } from '@/shared/ui';

import { formatCount, formatSignedPercent } from '../model/format';
import type { DashboardSummary } from '../model/types';

export const CARD_LINK_CLASS =
  'block rounded-xl transition-colors hover:bg-accent/50 focus-visible:outline-2 focus-visible:outline-ring';

type KpiRowProps = { kpis: DashboardSummary['kpis'] };

export const KpiRow = memo(function KpiRow({ kpis }: KpiRowProps) {
  const { t, i18n } = useTranslation('dashboard-overview', {
    keyPrefix: 'kpis',
  });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Link to="/dashboard/orders" className={CARD_LINK_CLASS}>
        <StatCard
          icon={ClipboardList}
          label={t('ordersToday')}
          value={formatCount(kpis.orders_today.value, i18n.language)}
          caption={formatSignedPercent(
            kpis.orders_today.change_pct,
            i18n.language,
          )}
          captionClassName={
            kpis.orders_today.change_pct < 0
              ? 'text-destructive!'
              : 'text-success!'
          }
        />
      </Link>

      <Link to="/dashboard/tracking" className={CARD_LINK_CLASS}>
        <StatCard
          icon={Users}
          label={t('activeFieldStaff')}
          value={formatCount(kpis.active_field_staff.value, i18n.language)}
          caption={t('onRoute', { count: kpis.active_field_staff.on_route })}
        />
      </Link>

      <Link to="/dashboard/deliveries" className={CARD_LINK_CLASS}>
        <StatCard
          icon={Truck}
          label={t('pendingDeliveries')}
          value={formatCount(kpis.pending_deliveries.value, i18n.language)}
          caption={
            kpis.pending_deliveries.delayed > 0
              ? t('delayedCount', { count: kpis.pending_deliveries.delayed })
              : undefined
          }
          captionClassName="text-destructive!"
        />
      </Link>

      <Link to="/dashboard/medicines" className={CARD_LINK_CLASS}>
        <StatCard
          icon={AlertTriangle}
          label={t('nearExpiryMedicines')}
          value={formatCount(kpis.near_expiry_medicines.value, i18n.language)}
          caption={t('withinDays', {
            count: kpis.near_expiry_medicines.window_days,
          })}
          captionClassName="text-warning!"
        />
      </Link>
    </div>
  );
});
