import { memo } from 'react';
import { ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/shared/lib';

type Props = { className?: string };

export const TrackingPermissionDenied = memo(function TrackingPermissionDenied({
  className,
}: Props) {
  const { t } = useTranslation('tracking', { keyPrefix: 'permissionDenied' });

  return (
    <div
      className={cn(
        'flex min-h-80 flex-col items-center justify-center gap-3 text-center',
        className,
      )}
    >
      <div
        className={cn(
          'bg-destructive/10 text-destructive flex size-12 items-center justify-center rounded-full',
          'animate-in zoom-in-50 fill-mode-[both] motion-reduce:animate-none',
        )}
      >
        <ShieldAlert className="size-6" />
      </div>
      <div
        className={cn(
          'space-y-1 [animation-delay:100ms]',
          'animate-in fade-in slide-in-from-bottom-1 fill-mode-[both] motion-reduce:animate-none',
        )}
      >
        <p className="text-foreground text-sm font-semibold">{t('title')}</p>
        <p className="text-muted-foreground max-w-xs text-xs">
          {t('description')}
        </p>
      </div>
    </div>
  );
});
