import { memo } from 'react';
import { Loader2, RefreshCw, WifiOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

import { useTrackingConnection } from '../model/useTrackingConnection';

export const TrackingConnectionBanner = memo(
  function TrackingConnectionBanner() {
    const { t } = useTranslation('tracking', { keyPrefix: 'connection' });
    const {
      connectionState,
      permissionDenied,
      isRetrying,
      subscriptionFailed,
      retry,
    } = useTrackingConnection();

    if (permissionDenied) return null;

    if (subscriptionFailed) {
      return (
        <div
          className={cn(
            'bg-card border-destructive/30 text-destructive absolute top-3 left-1/2 z-1000 flex -translate-x-1/2 items-center gap-2 border px-3 py-1.5 text-xs shadow-sm',
            'animate-in fade-in slide-in-from-top-1 fill-mode-[both] motion-reduce:animate-none',
            'flex-col rounded-2xl md:flex-row md:rounded-full',
          )}
        >
          <div className="flex items-center gap-2">
            <WifiOff className="size-3.5 shrink-0" />
            <span>{t('unavailable')}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive h-auto gap-1! px-1.5! py-0.5!"
            onClick={retry}
          >
            <RefreshCw className="size-3 shrink-0" />
            {t('retry')}
          </Button>
        </div>
      );
    }

    const isConnecting =
      connectionState === 'connecting' || connectionState === 'initialized';
    const showBanner =
      isConnecting || isRetrying || connectionState !== 'connected';

    if (!showBanner) return null;

    return (
      <div
        className={cn(
          'bg-card/95 border-border text-muted-foreground absolute top-3 left-1/2 z-1000 flex -translate-x-1/2 items-center gap-2 rounded-full border px-3 py-1.5 text-xs shadow-sm backdrop-blur-sm',
          'animate-in fade-in slide-in-from-top-1 fill-mode-[both] motion-reduce:animate-none',
        )}
      >
        <Loader2 className="size-3.5 animate-spin" />
        <span>
          {isRetrying
            ? t('retrying')
            : isConnecting
              ? t('connecting')
              : t('reconnecting')}
        </span>
      </div>
    );
  },
);
