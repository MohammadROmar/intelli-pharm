import { startTransition, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';

import type { HistoryNote } from '@/entities/pharmacy';
import { Button, Separator } from '@/shared/ui';
import { cn } from '@/shared/lib';

import { PharmacyNoteItem } from './PharmacyNoteItem';

const COLLAPSED_NOTES_COUNT = 3;

type HistoryNotesTimelineProps = { notes: HistoryNote[] };

export function HistoryNotesTimeline({ notes }: HistoryNotesTimelineProps) {
  const { t } = useTranslation('pharmacies', { keyPrefix: 'detail' });

  const [isExpanded, setIsExpanded] = useState(false);
  const notesListId = useId();

  const canToggle = notes.length > COLLAPSED_NOTES_COUNT;
  const isCollapsed = canToggle && !isExpanded;

  const visibleNotes = isCollapsed
    ? notes.slice(0, COLLAPSED_NOTES_COUNT)
    : notes;

  const ToggleIcon = isExpanded ? ChevronUp : ChevronDown;

  function handleToggle() {
    startTransition(() => {
      setIsExpanded((currentValue) => !currentValue);
    });
  }

  return (
    <>
      <Separator />

      <div className="relative">
        <ol id={notesListId} className="m-0 list-none p-0 pt-1">
          {visibleNotes.map((note, index) => (
            <PharmacyNoteItem
              key={note.id}
              note={note}
              isLast={index === visibleNotes.length - 1}
            />
          ))}
        </ol>

        {isCollapsed ? (
          <div
            aria-hidden="true"
            className="from-card via-card/70 pointer-events-none absolute -inset-x-px -bottom-px z-10 h-24 bg-linear-to-t to-transparent"
          />
        ) : null}
      </div>

      {canToggle ? (
        <div
          className={cn(
            'relative z-20 flex justify-center',
            isCollapsed ? '-mt-6' : 'mt-4',
          )}
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="bg-card shadow-sm"
            aria-controls={notesListId}
            aria-expanded={isExpanded}
            onClick={handleToggle}
          >
            {isExpanded ? t('historyNotesShowLess') : t('historyNotesShowAll')}

            <ToggleIcon aria-hidden="true" className="size-4" />
          </Button>
        </div>
      ) : null}
    </>
  );
}
