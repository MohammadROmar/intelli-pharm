import { useCallback } from 'react';
import {
  CheckCircle2,
  CircleDashed,
  Clock,
  Route,
  ThumbsUp,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  getNoteTypeStyle,
  useFormatDuration,
  useFormatDistance,
} from '@/entities/plan';
import type { PlanPath, PlanVisit } from '@/entities/plan';
import { cn } from '@/shared/lib';
import { Badge, ClampedText, LabeledLink, Separator } from '@/shared/ui';

import { ROUTE_COLORS } from '../lib/data';

type Props = {
  visit: PlanVisit;
  path?: PlanPath;
  isLast: boolean;
  onClick?: (id: number) => void;
};

function handleLinkClick(e: React.MouseEvent) {
  e.stopPropagation();
}

export function PlanVisitItem({ visit, path, isLast, onClick }: Props) {
  const { t } = useTranslation('plan', { keyPrefix: 'detail.visits' });

  const formatDistance = useFormatDistance();
  const formatDuration = useFormatDuration();

  const isVisited = visit.visited === 1;
  const isUseful = visit.useful === 1;

  const noteStyle = getNoteTypeStyle(visit.note_type);
  const NoteIcon = noteStyle.icon;

  const handleClick = useCallback(() => {
    onClick?.(visit.id);
  }, [onClick, visit.id]);

  return (
    <li className="pt-2">
      <button
        className={cn(
          '-mx-1 flex w-full gap-4 rounded-md px-1 py-2 transition-colors',
          onClick && 'hover:bg-muted/50 cursor-pointer',
        )}
        onClick={handleClick}
        aria-label={
          onClick ? t('viewDetails', { name: visit.pharmacy.name }) : undefined
        }
      >
        <div
          className={cn(
            'text-primary-foreground mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
            isVisited
              ? `bg-[${ROUTE_COLORS.visited}]`
              : `bg-[${ROUTE_COLORS.pending}]`,
          )}
          aria-label={`${t('stop')} ${visit.visit_order}`}
        >
          {visit.visit_order}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
            <div className="min-w-0">
              <div onClick={handleLinkClick}>
                <LabeledLink
                  to={`/dashboard/pharmacies/${visit.pharmacy.id}`}
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
            {path && (
              <>
                <span className="flex items-center gap-1">
                  <Route className="size-3" />
                  {formatDistance(Number(path.distance_m))}
                </span>

                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {formatDuration(Number(path.duration_sec))}
                </span>
              </>
            )}

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
            <div
              onClick={handleLinkClick}
              className="flex cursor-default flex-col items-start text-start"
            >
              <ClampedText
                className={cn(
                  'rounded-md border px-3 py-2 text-xs leading-relaxed',
                  noteStyle.box,
                )}
                expandLabel={t('notesExpand')}
                collapseLabel={t('notesCollapse')}
              >
                {visit.notes}
              </ClampedText>
            </div>
          )}
        </div>
      </button>

      {!isLast && <Separator className="mt-2" />}
    </li>
  );
}
