import { CalendarClock, ClipboardList } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { HistoryNote } from '@/entities/pharmacy';
import { cn, formatDate } from '@/shared/lib';
import { ClampedText, DetailCard, Separator } from '@/shared/ui';

import { getNoteTypeConfig } from '../config/noteTypeConfig';

function getTrimmedOrNull(value: unknown): string | null {
  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

type NoteItemProps = {
  note: HistoryNote;
  isLast: boolean;
};

function NoteItem({ note, isLast }: NoteItemProps) {
  const { t, i18n } = useTranslation('pharmacies', { keyPrefix: 'detail' });

  const config = getNoteTypeConfig(note.note_type);
  const TypeIcon = config.icon;

  const userName =
    getTrimmedOrNull(note.user_name) ?? t('historyNoteUnknownUser');
  const content = getTrimmedOrNull(note.notes);
  const visitedAt = getTrimmedOrNull(note.visited_at);

  return (
    <div
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
    </div>
  );
}

type Props = {
  notes: HistoryNote[];
};

export function PharmacyHistoryNotesCard({ notes }: Props) {
  const { t } = useTranslation('pharmacies', { keyPrefix: 'detail' });

  return (
    <DetailCard
      title={t('historyNotesTitle')}
      subtitle={t('historyNotesSubtitle')}
      icon={ClipboardList}
      itemsCount={notes.length}
    >
      {notes.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center gap-2 py-10 text-center">
          <ClipboardList aria-hidden="true" className="size-8 opacity-40" />
          <p className="text-sm">{t('historyNotesEmpty')}</p>
        </div>
      ) : (
        <>
          <Separator />

          <div className="pt-1">
            {notes.map((note, index) => (
              <NoteItem
                key={note.id}
                note={note}
                isLast={index === notes.length - 1}
              />
            ))}
          </div>
        </>
      )}
    </DetailCard>
  );
}
