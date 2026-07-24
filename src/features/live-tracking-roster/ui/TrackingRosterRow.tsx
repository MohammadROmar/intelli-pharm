import { memo, useCallback } from 'react';
import { BriefcaseBusiness, Truck, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  useLivePosition,
  useTrackingTick,
  getStalenessLevel,
  getStalenessOpacity,
  ROLE_ACCENT,
  DEFAULT_ROLE_ACCENT,
} from '@/entities/tracking';
import { cn } from '@/shared/lib';
import { LabeledLink } from '@/shared/ui';

type Props = {
  userId: number;
  isFocused: boolean;
  onSelect: (userId: number) => void;
};

export const TrackingRosterRow = memo(function TrackingRosterRow({
  userId,
  isFocused,
  onSelect,
}: Props) {
  const { t } = useTranslation('tracking', { keyPrefix: 'marker' });
  const position = useLivePosition(userId);
  useTrackingTick();

  const handleClick = useCallback(() => {
    onSelect(userId);
  }, [onSelect, userId]);

  if (!position) return null;

  const staleness = getStalenessLevel(position.ts);
  const roleLabel = t(position.r, position.r);

  return (
    <button
      type="button"
      aria-pressed={isFocused}
      onClick={handleClick}
      style={{ opacity: getStalenessOpacity(staleness) }}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-start transition-colors',
        'hover:bg-accent focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none',
        isFocused && 'bg-accent border-ring border-s-2',
      )}
    >
      <span
        aria-hidden
        className="flex size-7 shrink-0 items-center justify-center rounded-full text-white"
        style={{
          backgroundColor: ROLE_ACCENT[position.r] ?? DEFAULT_ROLE_ACCENT,
        }}
      >
        {position.r === 'distributor' ? (
          <Truck className="size-3.5" />
        ) : position.r === 'rep' ? (
          <BriefcaseBusiness className="size-3.5" />
        ) : (
          <User className="size-3.5" />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <LabeledLink
          to={`/dashboard/employees/${position.u}`}
          label={position.name}
          className="text-foreground! hover:text-primary! block truncate text-sm! font-medium!"
        />

        <span className="text-muted-foreground flex items-center gap-1 truncate text-xs">
          <span className="inline">{`${roleLabel} ·`}</span>
          {position.tid && (
            <LabeledLink
              to={`/dashboard/plans/${position.tid}`}
              label={`${t('onTask', { id: position.tid })}`}
              className="text-muted-foreground! hover:text-primary! text-xs"
            />
          )}
        </span>
      </span>
    </button>
  );
});
