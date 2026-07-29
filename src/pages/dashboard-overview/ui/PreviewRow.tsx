import { memo } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { MapPin, Route } from 'lucide-react';

import type { DashboardSummary } from '../model/types';
import { CARD_LINK_CLASS } from './KpiRow';

import { StatCard } from '@/shared/ui';

type PreviewRowProps = {
  liveTracking: DashboardSummary['live_tracking_preview'];
  todayPlans: DashboardSummary['today_plans'];
};

export const PreviewRow = memo(function PreviewRow({
  liveTracking,
  todayPlans,
}: PreviewRowProps) {
  const { t: tTracking } = useTranslation('dashboard-overview', {
    keyPrefix: 'liveTracking',
  });
  const { t: tPlans } = useTranslation('dashboard-overview', {
    keyPrefix: 'todayPlans',
  });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Link to="/dashboard/tracking" className={CARD_LINK_CLASS}>
        <StatCard
          icon={MapPin}
          value={tTracking('active', { count: liveTracking.active_count })}
          caption={tTracking('breakdown', {
            reps: liveTracking.representatives,
            distributors: liveTracking.distributors,
          })}
        />
      </Link>

      <Link to="/dashboard/plans" className={CARD_LINK_CLASS}>
        <StatCard
          icon={Route}
          value={tPlans('routes', { count: todayPlans.total })}
          caption={tPlans('breakdown', {
            inProgress: todayPlans.in_progress,
            completed: todayPlans.completed,
          })}
        />
      </Link>
    </div>
  );
});
