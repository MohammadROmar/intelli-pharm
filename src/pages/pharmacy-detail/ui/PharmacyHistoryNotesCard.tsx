import { ClipboardList } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { HistoryNote } from '@/entities/pharmacy';
import { DetailCard } from '@/shared/ui';

import { HistoryNotesTimeline } from './HistoryNotesTimeline';

type Props = { notes: HistoryNote[] };

export function PharmacyHistoryNotesCard({ notes }: Props) {
  const { t } = useTranslation('pharmacies', {
    keyPrefix: 'detail',
  });

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
        <HistoryNotesTimeline notes={notes} />
      )}
    </DetailCard>
  );
}
