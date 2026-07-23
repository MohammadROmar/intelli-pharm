import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UsersRound } from 'lucide-react';

import {
  useTrackingIds,
  useTrackingHydrated,
  getPosition,
  type TrackingFilter,
} from '@/entities/tracking';
import { Skeleton } from '@/shared/ui';

import { TrackingRosterRow } from './TrackingRosterRow';

const SKELETON_ROW_COUNT = 5;

type Props = {
  filter: TrackingFilter;
  focusedUserId: number | null;
  onSelectUser: (userId: number) => void;
};

export function TrackingRosterList({
  filter,
  focusedUserId,
  onSelectUser,
}: Props) {
  const { t, i18n } = useTranslation('tracking', { keyPrefix: 'roster' });
  const ids = useTrackingIds(filter);
  const isHydrated = useTrackingHydrated();

  const sortedIds = useMemo(() => {
    return [...ids].sort((a, b) => {
      const nameA = getPosition(a)?.name ?? '';
      const nameB = getPosition(b)?.name ?? '';
      return nameA.localeCompare(nameB, i18n.language);
    });
  }, [ids, i18n.language]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-1.5">
        <span role="status" className="sr-only">
          {t('loading')}
        </span>
        <div aria-hidden="true" className="flex flex-col gap-0.5">
          {Array.from({ length: SKELETON_ROW_COUNT }, (_, index) => (
            <div key={index} className="flex items-center gap-2.5 px-2.5 py-2">
              <Skeleton className="size-7 shrink-0 rounded-full" />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <Skeleton className="h-3.5 w-24 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sortedIds.length === 0) {
    return (
      <div className="text-muted-foreground flex min-h-0 flex-1 flex-col items-center justify-center gap-2 px-4 py-10 text-center">
        <UsersRound className="size-8 opacity-50" aria-hidden="true" />
        <p className="text-sm">{t('empty')}</p>
      </div>
    );
  }

  return (
    <ul className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-1.5">
      {sortedIds.map((id) => (
        <li key={id}>
          <TrackingRosterRow
            userId={id}
            isFocused={id === focusedUserId}
            onSelect={onSelectUser}
          />
        </li>
      ))}
    </ul>
  );
}
