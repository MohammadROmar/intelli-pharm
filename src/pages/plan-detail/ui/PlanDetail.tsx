import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Route } from 'lucide-react';

import { PlanVisitItem } from './PlanVisitItem';

import { VisitDetail } from '@/features/plan-visit-detail';
import { useFormatDistance, useFormatDuration } from '@/entities/plan';
import type { PlanDetail } from '@/entities/plan';
import { cn, formatDate } from '@/shared/lib';
import { BadgeLink, DetailCard, DetailCell, Separator } from '@/shared/ui';

import { PlanRouteCard } from './PlanRouteCard';
import { PlanDetailHeader } from './PlanDetailHeader';

type Props = {
  plan: PlanDetail;
  canViewEmployee: boolean;
  canViewRegion: boolean;
  canViewPharmacy: boolean;
};

export function PlanDetail({
  plan,
  canViewEmployee,
  canViewRegion,
  canViewPharmacy,
}: Props) {
  const { t, i18n } = useTranslation('plan', { keyPrefix: 'detail' });

  const [selectedVisitId, setSelectedVisitId] = useState<number | null>(null);

  const formatDistance = useFormatDistance();
  const formatDuration = useFormatDuration();

  const visitedCount = useMemo(
    () => plan.visits.filter((visit) => visit.visited === 1).length,
    [plan.visits],
  );

  const pathByVisitOrder = useMemo(
    () => new Map(plan.paths.map((path) => [path.to_sequence, path])),
    [plan.paths],
  );

  const handleVisitSelect = useCallback((id: number) => {
    setSelectedVisitId(id);
  }, []);

  const handleVisitClose = useCallback(() => {
    setSelectedVisitId(null);
  }, []);

  return (
    <>
      <PlanDetailHeader plan={plan} />

      <DetailCard
        title={t('overview.title')}
        subtitle={t('overview.subtitle')}
        icon={Route}
      >
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          <DetailCell label={t('overview.user')}>
            <BadgeLink
              label={plan.user_name}
              to={
                canViewEmployee
                  ? `/dashboard/employees/${plan.user_id}`
                  : undefined
              }
            />
          </DetailCell>

          <DetailCell label={t('overview.region')}>
            <BadgeLink
              label={plan.region_name}
              to={
                canViewRegion
                  ? `/dashboard/regions/${plan.region_id}`
                  : undefined
              }
            />
          </DetailCell>

          <DetailCell label={t('overview.createdAt')}>
            <span className="flex items-center gap-1.5 text-sm">
              {formatDate(plan.created_at, i18n.language)}
            </span>
          </DetailCell>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-6">
          <DetailCell label={t('overview.totalDistance')}>
            <span className="flex items-center gap-1.5 text-sm">
              {formatDistance(plan.total_distance_m)}
            </span>
          </DetailCell>

          <DetailCell label={t('overview.totalDuration')}>
            <span className="flex items-center gap-1.5 text-sm">
              {formatDuration(plan.total_duration_sec)}
            </span>
          </DetailCell>
        </div>

        <Separator />

        <div className="grid grid-cols-1">
          <DetailCell label={t('overview.reasonDetails')}>
            <p
              className={cn(
                'text-sm leading-relaxed',
                !plan.reason_details && 'text-muted-foreground italic',
              )}
            >
              {plan.reason_details || t('overview.noDetails')}
            </p>
          </DetailCell>
        </div>
      </DetailCard>

      <PlanRouteCard t={t} plan={plan} canViewPharmacy={canViewPharmacy} />

      <DetailCard
        title={t('visits.title', { total: plan.visits.length })}
        subtitle={t('visits.subtitle', {
          visited: visitedCount,
          total: plan.visits.length,
        })}
        icon={MapPin}
      >
        <ul>
          {plan.visits.map((visit, index) => (
            <PlanVisitItem
              key={visit.id}
              visit={visit}
              path={pathByVisitOrder.get(visit.visit_order)}
              isLast={index === plan.visits.length - 1}
              onClick={handleVisitSelect}
              canViewPharmacy={canViewPharmacy}
            />
          ))}
        </ul>
      </DetailCard>

      <VisitDetail
        id={selectedVisitId}
        onClose={handleVisitClose}
        canViewPharmacy={canViewPharmacy}
      />
    </>
  );
}
