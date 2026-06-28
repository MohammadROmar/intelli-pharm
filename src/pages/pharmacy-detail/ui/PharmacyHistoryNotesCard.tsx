import { useTranslation } from 'react-i18next';
import { ClipboardList } from 'lucide-react';

import type { HistoryNote } from '@/entities/pharmacy';
import { cn } from '@/shared/lib';
import { ClampedText, DetailCard, Separator } from '@/shared/ui';

import { NOTE_TYPE_CONFIG } from '../config/noteTypeConfig';

type NoteItemProps = { note: HistoryNote; isLast: boolean };

function NoteItem({ note, isLast }: NoteItemProps) {
  const { t } = useTranslation('pharmacies', { keyPrefix: 'detail' });

  const config = NOTE_TYPE_CONFIG[note.note_type];
  const TypeIcon = config.icon;

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-full',
            config.iconClassName,
          )}
        >
          <TypeIcon className="size-4" />
        </div>
        {!isLast && <div className="bg-border w-px flex-1" />}
      </div>

      <div className={cn('min-w-0 flex-1', !isLast && 'pb-5')}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-foreground text-sm font-semibold">
            {note.user_name}
          </span>
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
              config.badgeClassName,
            )}
          >
            {t(config.labelKey)}
          </span>
        </div>

        <ClampedText
          className="text-foreground/75 mt-1.5 text-sm leading-relaxed"
          expandLabel={t('historyNoteExpand')}
          collapseLabel={t('historyNoteCollapse')}
        >
          {note.notes}
        </ClampedText>
      </div>
    </div>
  );
}

type Props = { notes: HistoryNote[] };

export function PharmacyHistoryNotesCard({ notes }: Props) {
  const { t } = useTranslation('pharmacies', { keyPrefix: 'detail' });

  const isEmpty = notes.length === 0;

  return (
    <DetailCard
      title={t('historyNotesTitle')}
      subtitle={t('historyNotesSubtitle')}
      icon={ClipboardList}
      itemsCount={notes.length}
    >
      {isEmpty ? (
        <div className="text-muted-foreground flex flex-col items-center gap-2 py-10 text-center">
          <ClipboardList className="size-8 opacity-40" />
          <p className="text-sm">{t('historyNotesEmpty')}</p>
        </div>
      ) : (
        <>
          <Separator />
          <div className="pt-1">
            {notes.map((note, index) => (
              <NoteItem
                key={`${note.user_name}-${index}`}
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
