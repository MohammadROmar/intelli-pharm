import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  User,
} from 'lucide-react';

import { formatDate, cn } from '@/shared/lib';
import { Button, Separator, DetailCard } from '@/shared/ui';
import type { HistoryNote } from '@/entities/pharmacy';

type NoteItemProps = { note: HistoryNote; isLast: boolean };

function NoteItem({ note, isLast }: NoteItemProps) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.detail',
  });
  const [expanded, setExpanded] = useState(false);

  const isLong = note.notes.length > 180;
  const shouldClamp = isLong && !expanded;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full">
          <User className="size-4" />
        </div>
        {!isLast && <div className="bg-border mt-1 w-px flex-1" />}
      </div>

      <div className={cn('min-w-0 flex-1', !isLast && 'pb-6')}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-foreground text-sm font-semibold">
            {note.user_name}
          </span>
          <span className="text-muted-foreground text-xs">·</span>
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            <CalendarDays className="size-3 shrink-0" />
            {formatDate(note.visited_at, i18n.language)}
          </span>
        </div>

        <p
          className={cn(
            'text-foreground/80 mt-2 text-sm leading-relaxed',
            shouldClamp && 'line-clamp-3',
          )}
        >
          {note.notes}
        </p>

        {isLong && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((prev) => !prev)}
            className="text-muted-foreground hover:text-foreground mt-1 h-auto gap-1 px-0 py-0.5 text-xs"
          >
            {expanded ? (
              <>
                <ChevronUp className="size-3" />
                {t('historyNoteCollapse')}
              </>
            ) : (
              <>
                <ChevronDown className="size-3" />
                {t('historyNoteExpand')}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

type Props = { notes: HistoryNote[] };

export function MedicineHistoryNotesCard({ notes }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.detail',
  });

  return (
    <DetailCard
      title={t('historyNotesTitle')}
      subtitle={t('historyNotesSubtitle')}
      icon={ClipboardList}
      itemsCount={notes.length}
    >
      {notes.length > 0 && <Separator />}
      {notes.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center gap-2 py-10 text-center">
          <ClipboardList className="size-8" />
          <p className="text-sm">{t('historyNotesEmpty')}</p>
        </div>
      ) : (
        <div>
          {notes.map((note, index) => (
            <NoteItem
              key={note.id}
              note={note}
              isLast={index === notes.length - 1}
            />
          ))}
        </div>
      )}
    </DetailCard>
  );
}
