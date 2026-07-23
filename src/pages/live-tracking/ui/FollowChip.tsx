import { useTranslation } from 'react-i18next';
import { WifiOff, X } from 'lucide-react';

import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

type Props = {
  name: string;
  isFollowing: boolean;
  isOffline: boolean;
  onResume: () => void;
  onStop: () => void;
};

export function FollowChip({
  name,
  isFollowing,
  isOffline,
  onResume,
  onStop,
}: Props) {
  const { t } = useTranslation('tracking', { keyPrefix: 'follow' });

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'bg-card/95 border-border text-foreground absolute end-4 bottom-4 z-1000 flex items-center gap-1 rounded-full border py-1 ps-1 pe-1 text-xs shadow-sm backdrop-blur-sm',
        'animate-in fade-in slide-in-from-bottom-1 fill-mode-[both] motion-reduce:animate-none',
      )}
    >
      {isOffline ? (
        <span className="text-muted-foreground flex items-center gap-1.5 ps-2 pe-1">
          <WifiOff className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="max-w-32 truncate font-medium">
            {t('offline', { name })}
          </span>
        </span>
      ) : isFollowing ? (
        <span className="flex max-w-32 items-center gap-1.5 truncate ps-2 pe-1 font-medium">
          {t('following', { name })}
        </span>
      ) : (
        <button
          type="button"
          onClick={onResume}
          className="hover:bg-accent flex items-center gap-1.5 rounded-full py-1 ps-2 pe-1 text-start transition-colors"
        >
          <span className="max-w-32 truncate font-medium">
            {t('resume', { name })}
          </span>
        </button>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="size-6 shrink-0 rounded-full"
        onClick={onStop}
        aria-label={t('stop')}
      >
        <X className="size-3.5" />
      </Button>
    </div>
  );
}
