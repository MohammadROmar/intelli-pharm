import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Map as MapIcon, Route } from 'lucide-react';

import { PlanVisitItem } from './PlanVisitItem';

import { VisitDetail } from '@/features/plan-visit-detail';
import { useFormatDistance, useFormatDuration } from '@/entities/plan';
import type { PlanDetail } from '@/entities/plan';
import { cn, formatDate, ErrorBoundary } from '@/shared/lib';
import {
  BadgeLink,
  DetailCard,
  DetailCell,
  SectionErrorFallback,
  Separator,
  Skeleton,
} from '@/shared/ui';

import { ROUTE_COLORS } from '../config/colors';
import { PlanDetailHeader } from './PlanDetailHeader';

const PlanRouteMap = lazy(() => import('./PlanRouteMap'));

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

      <DetailCard
        title={t('map.title')}
        subtitle={t('map.subtitle')}
        icon={MapIcon}
      >
        <div className="text-muted-foreground mb-3 flex flex-wrap items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span
              className={`inline-block size-3 rounded-full bg-[${ROUTE_COLORS.start}]`}
            />
            {t('map.legend.start')}
          </span>

          <span className="flex items-center gap-1.5">
            <span
              className={`inline-block size-3 rounded-full bg-[${ROUTE_COLORS.visited}]`}
            />
            {t('map.legend.visited')}
          </span>

          <span className="flex items-center gap-1.5">
            <span
              className={`bg-[${ROUTE_COLORS.pending}] inline-block size-3 rounded-full`}
            />
            {t('map.legend.notVisited')}
          </span>
        </div>

        <ErrorBoundary FallbackComponent={SectionErrorFallback}>
          <Suspense fallback={<Skeleton className="h-105 w-full rounded-lg" />}>
            <PlanRouteMap
              paths={plan.paths}
              visits={plan.visits}
              canViewPharmacy={canViewPharmacy}
            />
          </Suspense>
        </ErrorBoundary>
      </DetailCard>

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
