import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Route } from 'lucide-react';

import type { useOverviewAccess } from '@/features/overview-access';
import { StatCard } from '@/shared/ui';

import { ConditionalLink } from './ConditionalLink';
import type { DashboardSummary } from '../model/types';
import { OVERVIEW_CARD_LINK_CLASS } from '../model/constants';

type OverviewAccess = ReturnType<typeof useOverviewAccess>;

type PreviewRowAccess = Pick<
  OverviewAccess,
  'canViewLiveTracking' | 'canViewPlans'
>;

type PreviewRowProps = {
  liveTracking: DashboardSummary['live_tracking_preview'];
  todayPlans: DashboardSummary['today_plans'];
  access: PreviewRowAccess;
};

export const PreviewRow = memo(function PreviewRow({
  liveTracking,
  todayPlans,
  access,
}: PreviewRowProps) {
  const { t: tTracking } = useTranslation('dashboard-overview', {
    keyPrefix: 'liveTracking',
  });

  const { t: tPlans } = useTranslation('dashboard-overview', {
    keyPrefix: 'todayPlans',
  });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <ConditionalLink
        enabled={access.canViewLiveTracking}
        to="/dashboard/tracking"
        className={OVERVIEW_CARD_LINK_CLASS}
      >
        <StatCard
          icon={MapPin}
          value={tTracking('active', {
            count: liveTracking.active_count,
          })}
          caption={tTracking('breakdown', {
            reps: liveTracking.representatives,
            distributors: liveTracking.distributors,
          })}
        />
      </ConditionalLink>

      <ConditionalLink
        enabled={access.canViewPlans}
        to="/dashboard/plans"
        className={OVERVIEW_CARD_LINK_CLASS}
      >
        <StatCard
          icon={Route}
          value={tPlans('routes', {
            count: todayPlans.total,
          })}
          caption={tPlans('breakdown', {
            inProgress: todayPlans.in_progress,
            completed: todayPlans.completed,
          })}
        />
      </ConditionalLink>
    </div>
  );
});
