import {
  CheckCircle2,
  CircleDashed,
  Clock,
  Route,
  ThumbsUp,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useFormatDistance, useFormatDuration } from '@/entities/plan';
import type { PlanVisit } from '@/entities/plan';
import { cn } from '@/shared/lib';
import { Badge, LabeledLink, Separator } from '@/shared/ui';
import { getNoteTypeStyle } from '../lib/getNoteTypeStyle';

type Props = { visit: PlanVisit; isLast: boolean };

export function PlanVisitItem({ visit, isLast }: Props) {
  const { t } = useTranslation('plan', { keyPrefix: 'detail.visits' });

  const formatDistance = useFormatDistance();
  const formatDuration = useFormatDuration();

  const isVisited = visit.visited === 1;
  const isUseful = visit.useful === 1;

  const noteStyle = getNoteTypeStyle(visit.note_type);
  const NoteIcon = noteStyle.icon;

  return (
    <>
      <div className="flex gap-4 px-1">
        <div
          className={cn(
            'text-primary-foreground mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
            isVisited ? 'bg-green-500' : 'bg-orange-400',
          )}
          aria-label={`${t('stop')} ${visit.visit_order}`}
        >
          {visit.visit_order}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <LabeledLink
                to={`/dashboard/pharmacies/${visit.pharmacy.id}`}
                label={visit.pharmacy.name}
                className="truncate text-sm leading-snug font-semibold"
              />
              <p className="text-muted-foreground text-xs">
                {visit.pharmacy.info}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
              <Badge
                variant={isVisited ? 'success' : 'muted'}
                className="flex items-center gap-1"
              >
                {isVisited ? (
                  <CheckCircle2 className="size-3" />
                ) : (
                  <CircleDashed className="size-3" />
                )}
                {t(isVisited ? 'visited' : 'notVisited')}
              </Badge>

              {isUseful && (
                <Badge variant="info" className="flex items-center gap-1">
                  <ThumbsUp className="size-3" />
                  {t('useful')}
                </Badge>
              )}
            </div>
          </div>

          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
            <span className="flex flex-wrap items-center gap-1">
              <Route className="size-3" />
              {formatDistance(visit.distance_m)}
            </span>

            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {formatDuration(visit.duration_sec)}
            </span>

            {visit.notes && (
              <span
                className={cn(
                  'flex items-center gap-1 font-medium',
                  noteStyle.accent,
                )}
              >
                <NoteIcon className="size-3" />
                {t(`noteType.${visit.note_type}`, {
                  defaultValue: visit.note_type,
                })}
              </span>
            )}
          </div>

          {visit.notes && (
            <p
              className={cn(
                'rounded-md border px-3 py-2 text-xs leading-relaxed',
                noteStyle.box,
              )}
            >
              {visit.notes}
            </p>
          )}
        </div>
      </div>

      {!isLast && <Separator />}
    </>
  );
}
