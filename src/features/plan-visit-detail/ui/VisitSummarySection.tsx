import { ClipboardList } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { getNoteTypeStyle, type VisitSummary } from '@/entities/visit';
import { cn } from '@/shared/lib';
import { CardSectionHeader, ClampedText } from '@/shared/ui';

type Props = { summary: VisitSummary };

export function VisitSummarySection({ summary }: Props) {
  const { t } = useTranslation('visit-detail', { keyPrefix: 'sheet' });

  const noteStyle = getNoteTypeStyle(summary.note_type);
  const NoteIcon = noteStyle.icon;

  return (
    <div className="flex flex-col gap-3 px-4 py-1">
      <CardSectionHeader
        icon={ClipboardList}
        title={t('summary.title')}
        description={t('summary.subtitle')}
      />

      <div
        className={cn(
          'flex items-start gap-3 rounded-lg border px-4 py-3',
          noteStyle.box,
        )}
      >
        <NoteIcon
          className={cn('mt-0.5 size-4 shrink-0', noteStyle.accent)}
          aria-hidden
        />

        {summary.notes_snippet ? (
          <div className="min-w-0 flex-1">
            <ClampedText
              className="text-sm leading-relaxed"
              expandLabel={t('notesExpand')}
              collapseLabel={t('notesCollapse')}
            >
              {summary.notes_snippet}
            </ClampedText>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm italic">{t('noNote')}</p>
        )}
      </div>
    </div>
  );
}
