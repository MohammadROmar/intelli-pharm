import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarClock } from 'lucide-react';

import type { HistoryNote } from '@/entities/pharmacy';
import { ClampedText } from '@/shared/ui';
import { cn, formatDate } from '@/shared/lib';

import { getNoteTypeConfig } from '../config/noteTypeConfig';
import { getTrimmedOrNull } from '../lib/getTrimmedOrNull';

type NoteItemProps = { note: HistoryNote; isLast: boolean };

export const PharmacyNoteItem = memo(function NoteItem({
  note,
  isLast,
}: NoteItemProps) {
  const { t, i18n } = useTranslation('pharmacies', {
    keyPrefix: 'detail',
  });

  const config = getNoteTypeConfig(note.note_type);
  const TypeIcon = config.icon;

  const userName =
    getTrimmedOrNull(note.user_name) ?? t('historyNoteUnknownUser');
  const content = getTrimmedOrNull(note.notes);
  const visitedAt = getTrimmedOrNull(note.visited_at);

  return (
    <li
      className={cn(
        'flex gap-3',
        '[contain-intrinsic-size:auto_96px] [content-visibility:auto]',
      )}
    >
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-full',
            config.iconClassName,
          )}
        >
          <TypeIcon aria-hidden="true" className="size-4" />
        </div>

        {isLast ? null : <div className="bg-border w-px flex-1" />}
      </div>

      <div className={cn('min-w-0 flex-1', !isLast && 'pb-5')}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-foreground text-sm font-semibold">
            {userName}
          </span>

          <span
            className={cn(
              'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
              config.badgeClassName,
            )}
          >
            {t(config.labelKey)}
          </span>

          {visitedAt ? (
            <time
              className="text-muted-foreground inline-flex items-center gap-1 text-xs"
              dateTime={visitedAt.replace(' ', 'T')}
            >
              <CalendarClock aria-hidden="true" className="size-3" />
              {formatDate(visitedAt, i18n.language)}
            </time>
          ) : null}
        </div>

        {content ? (
          <ClampedText
            className="text-foreground/75 mt-1.5 text-sm leading-relaxed"
            expandLabel={t('historyNoteExpand')}
            collapseLabel={t('historyNoteCollapse')}
          >
            {content}
          </ClampedText>
        ) : (
          <p className="text-muted-foreground mt-1.5 text-sm italic">
            {t('historyNoteNoContent')}
          </p>
        )}
      </div>
    </li>
  );
});
