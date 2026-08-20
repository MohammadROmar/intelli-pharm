import { useCallback } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Ban,
  CheckCircle2,
  CircleDashed,
  CircleX,
  Clock,
  Route,
  SkipForward,
  ThumbsUp,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { PlanVisit } from '@/entities/plan';
import {
  useFormatDuration,
  useFormatDistance,
  ROUTE_COLORS,
} from '@/entities/plan';
import { cn } from '@/shared/lib';
import { Badge, LabeledLink, Separator } from '@/shared/ui';

type Props = {
  visit: PlanVisit;
  isLast: boolean;
  onClick?: (id: number) => void;
  canViewPharmacy: boolean;
};

type VisitStatusConfig = {
  icon: LucideIcon;
  variant: 'muted' | 'success' | 'destructive';
};

const VISIT_STATUS_CONFIG = {
  pending: { icon: CircleDashed, variant: 'muted' },
  completed: { icon: CheckCircle2, variant: 'success' },
  skipped: { icon: SkipForward, variant: 'muted' },
  failed: { icon: CircleX, variant: 'destructive' },
  blocked: { icon: Ban, variant: 'destructive' },
} satisfies Record<PlanVisit['status'], VisitStatusConfig>;

export function PlanVisitItem({
  visit,
  isLast,
  onClick,
  canViewPharmacy,
}: Props) {
  const { t } = useTranslation('plan', { keyPrefix: 'detail.visits' });
  const { t: tVisit } = useTranslation('visit-detail', {
    keyPrefix: 'sheet',
  });

  const formatDistance = useFormatDistance();
  const formatDuration = useFormatDuration();

  const isVisited = visit.visited === 1;
  const isUseful = visit.useful === 1;
  const statusConfig = VISIT_STATUS_CONFIG[visit.status];
  const StatusIcon = statusConfig.icon;

  const handleClick = useCallback(() => {
    onClick?.(visit.id);
  }, [onClick, visit.id]);

  return (
    <li className="pt-2">
      <div
        className={cn(
          'relative -mx-1 flex gap-4 rounded-md px-1 py-2 transition-colors',
          onClick && 'hover:bg-muted/50',
        )}
      >
        {onClick && (
          <button
            type="button"
            className="focus-visible:ring-ring absolute inset-0 z-10 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            onClick={handleClick}
            aria-label={t('viewDetails', { name: visit.pharmacy.name })}
          />
        )}

        <div
          className={cn(
            'relative z-20 flex min-w-0 flex-1 gap-4',
            onClick && 'pointer-events-none',
          )}
        >
          <div
            className="text-primary-foreground mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
            style={{
              backgroundColor: isVisited
                ? ROUTE_COLORS.visited
                : ROUTE_COLORS.pending,
            }}
            aria-label={`${t('stop')} ${visit.visit_order}`}
          >
            {visit.visit_order}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
              <div className="min-w-0">
                <div
                  className={cn(
                    onClick && canViewPharmacy && 'pointer-events-auto',
                  )}
                >
                  <LabeledLink
                    to={
                      canViewPharmacy
                        ? `/dashboard/pharmacies/${visit.pharmacy.id}`
                        : undefined
                    }
                    label={visit.pharmacy.name}
                    className="truncate text-sm leading-snug font-semibold"
                  />
                </div>
                <p className="text-muted-foreground text-xs">
                  {visit.pharmacy.info}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
                <Badge
                  variant={statusConfig.variant}
                  className="flex items-center gap-1"
                >
                  <StatusIcon className="size-3" aria-hidden />
                  {tVisit(`status.${visit.status}`)}
                </Badge>

                {isUseful && (
                  <Badge variant="info" className="flex items-center gap-1">
                    <ThumbsUp className="size-3" aria-hidden />
                    {tVisit('useful')}
                  </Badge>
                )}
              </div>
            </div>

            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                <Route className="size-3" aria-hidden />
                {formatDistance(Number(visit.distance_m))}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="size-3" aria-hidden />
                {formatDuration(Number(visit.duration_sec))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {!isLast && <Separator className="mt-2" />}
    </li>
  );
}
