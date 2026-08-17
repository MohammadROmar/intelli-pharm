import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, ClipboardList, Truck, Users } from 'lucide-react';

import type { useOverviewAccess } from '@/features/overview-access';
import { StatCard } from '@/shared/ui';

import { formatCount, formatSignedPercent } from '../model/format';
import type { DashboardSummary } from '../model/types';

import { ConditionalLink } from './ConditionalLink';
import { OVERVIEW_CARD_LINK_CLASS } from '../model/constants';

type OverviewAccess = ReturnType<typeof useOverviewAccess>;

type KpiRowAccess = Pick<
  OverviewAccess,
  | 'canViewOrders'
  | 'canViewLiveTracking'
  | 'canViewDeliveries'
  | 'canViewMedicines'
>;

type KpiRowProps = {
  kpis: DashboardSummary['kpis'];
  access: KpiRowAccess;
};

export const KpiRow = memo(function KpiRow({ kpis, access }: KpiRowProps) {
  const { t, i18n } = useTranslation('dashboard-overview', {
    keyPrefix: 'kpis',
  });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <ConditionalLink
        enabled={access.canViewOrders}
        to="/dashboard/orders"
        className={OVERVIEW_CARD_LINK_CLASS}
      >
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
      </ConditionalLink>

      <ConditionalLink
        enabled={access.canViewLiveTracking}
        to="/dashboard/tracking"
        className={OVERVIEW_CARD_LINK_CLASS}
      >
        <StatCard
          icon={Users}
          label={t('activeFieldStaff')}
          value={formatCount(kpis.active_field_staff.value, i18n.language)}
          caption={t('onRoute', {
            count: kpis.active_field_staff.on_route,
          })}
        />
      </ConditionalLink>

      <ConditionalLink
        enabled={access.canViewDeliveries}
        to="/dashboard/deliveries"
        className={OVERVIEW_CARD_LINK_CLASS}
      >
        <StatCard
          icon={Truck}
          label={t('pendingDeliveries')}
          value={formatCount(kpis.pending_deliveries.value, i18n.language)}
          caption={
            kpis.pending_deliveries.delayed > 0
              ? t('delayedCount', {
                  count: kpis.pending_deliveries.delayed,
                })
              : undefined
          }
          captionClassName="text-destructive!"
        />
      </ConditionalLink>

      <ConditionalLink
        enabled={access.canViewMedicines}
        to="/dashboard/medicines"
        className={OVERVIEW_CARD_LINK_CLASS}
      >
        <StatCard
          icon={AlertTriangle}
          label={t('nearExpiryMedicines')}
          value={formatCount(kpis.near_expiry_medicines.value, i18n.language)}
          caption={t('withinDays', {
            count: kpis.near_expiry_medicines.window_days,
          })}
          captionClassName="text-warning!"
        />
      </ConditionalLink>
    </div>
  );
});
