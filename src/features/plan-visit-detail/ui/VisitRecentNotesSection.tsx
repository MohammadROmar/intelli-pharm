import { MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { getNoteTypeStyle, type RecentNote } from '@/entities/visit';
import { cn } from '@/shared/lib';
import { CardSectionHeader, ClampedText } from '@/shared/ui';

type NoteItemProps = { note: RecentNote };

function NoteItem({ note }: NoteItemProps) {
  const { t } = useTranslation('visit-detail', { keyPrefix: 'sheet' });

  const noteStyle = getNoteTypeStyle(note.note_type);
  const NoteIcon = noteStyle.icon;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted-foreground text-xs font-medium">
          {note.user_name ?? t('notAvailable')}
        </span>
        <span
          className={cn(
            'flex items-center gap-1 text-xs font-semibold',
            noteStyle.accent,
          )}
        >
          <NoteIcon className="size-3" aria-hidden />
          {t(`noteType.${note.note_type}`)}
        </span>
      </div>

      {note.note ? (
        <ClampedText
          className={cn(
            'rounded-lg border px-3 py-2.5 text-xs leading-relaxed',
            noteStyle.box,
          )}
          expandLabel={t('notesExpand')}
          collapseLabel={t('notesCollapse')}
        >
          {note.note}
        </ClampedText>
      ) : (
        <p className="text-muted-foreground rounded-lg border border-dashed px-3 py-2.5 text-xs italic">
          {t('noNote')}
        </p>
      )}
    </div>
  );
}

type Props = { notes: RecentNote[] };

export function VisitRecentNotesSection({ notes }: Props) {
  const { t } = useTranslation('visit-detail', { keyPrefix: 'sheet' });

  return (
    <div className="flex flex-col gap-3 px-4 py-1">
      <CardSectionHeader
        icon={MessageSquare}
        title={t('recentNotes')}
        description={t('recentNotesSubtitle')}
      />

      {notes.length === 0 ? (
        <p className="text-muted-foreground px-1 text-xs italic">
          {t('noNotes')}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
