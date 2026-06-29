import {
  CheckCircle2,
  CircleDashed,
  ClipboardList,
  MessageSquare,
  Phone,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { getNoteTypeStyle } from '@/entities/plan';
import type { RecentNote, VisitDetail } from '../model/visitTypes';
import { cn } from '@/shared/lib';
import {
  Badge,
  CardSectionHeader,
  ClampedText,
  LabeledLink,
  Separator,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui';

function resolveIsUseful(dealStatus: string): boolean {
  return dealStatus.toLowerCase() === 'closed';
}

type NoteItemProps = { note: RecentNote };

function NoteItem({ note }: NoteItemProps) {
  const { t } = useTranslation('plan', { keyPrefix: 'detail.visits' });

  const noteStyle = getNoteTypeStyle(note.note_type);
  const NoteIcon = noteStyle.icon;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted-foreground text-xs font-medium">
          {note.user_name}
        </span>
        <span
          className={cn(
            'flex items-center gap-1 text-xs font-semibold',
            noteStyle.accent,
          )}
        >
          <NoteIcon className="size-3" />
          {t(`noteType.${note.note_type}`, { defaultValue: note.note_type })}
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

type Props = { visit: VisitDetail };

export function VisitSheet({ visit }: Props) {
  const { t } = useTranslation('plan', { keyPrefix: 'detail.visits' });

  const isVisited = visit.visited === 1;
  const isUseful = resolveIsUseful(visit.summary.deal_status);

  const summaryNoteStyle = getNoteTypeStyle(visit.summary.note_type);
  const SummaryNoteIcon = summaryNoteStyle.icon;

  return (
    <>
      <SheetHeader className="border-b pb-5">
        <SheetTitle className="w-fit text-base">
          <LabeledLink
            to={`/dashboard/pharmacies/${visit.pharmacy.id}`}
            label={visit.pharmacy.name}
            className="leading-snug font-semibold"
          />
        </SheetTitle>

        <SheetDescription className="flex items-center gap-1.5">
          <Phone className="size-3" />
          {visit.pharmacy.phone_number}
        </SheetDescription>

        <div className="flex flex-wrap items-center gap-2 pt-1">
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

          {isVisited && (
            <Badge
              variant={isUseful ? 'info' : 'muted'}
              className="flex items-center gap-1"
            >
              {isUseful ? (
                <ThumbsUp className="size-3" />
              ) : (
                <ThumbsDown className="size-3" />
              )}
              {t(isUseful ? 'useful' : 'notUseful')}
            </Badge>
          )}
        </div>
      </SheetHeader>

      <div className="flex flex-col gap-3 px-4 py-1">
        <CardSectionHeader
          icon={ClipboardList}
          title={t('summary.title')}
          description={t('summary.subtitle')}
        />

        <div
          className={cn(
            'flex items-start gap-3 rounded-lg border px-4 py-3',
            summaryNoteStyle.box,
          )}
        >
          <SummaryNoteIcon
            className={cn('mt-0.5 size-4 shrink-0', summaryNoteStyle.accent)}
          />

          {visit.summary.notes_snippet ? (
            <div className="min-w-0 flex-1">
              <ClampedText
                className="text-sm leading-relaxed"
                expandLabel={t('notesExpand')}
                collapseLabel={t('notesCollapse')}
              >
                {visit.summary.notes_snippet}
              </ClampedText>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm italic">
              {t('noNote')}
            </p>
          )}
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-3 px-4 py-1">
        <CardSectionHeader
          icon={MessageSquare}
          title={t('recentNotes')}
          description={t('recentNotesSubtitle')}
        />

        {visit.recent_notes.length === 0 ? (
          <p className="text-muted-foreground px-1 text-xs italic">
            {t('noNotes')}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {visit.recent_notes.map((note) => (
              <NoteItem key={note.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
