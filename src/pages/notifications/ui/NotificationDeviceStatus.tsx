import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, BellOff, Loader2, RefreshCw } from 'lucide-react';

import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

import { useNotificationPermission } from '../model/useNotificationPermission';
import { useDeviceRegistration } from '@/entities/device';

type Props = {
  className?: string;
};

export const NotificationDeviceStatus = memo(function NotificationDeviceStatus({
  className,
}: Props) {
  const { t } = useTranslation('notifications', { keyPrefix: 'deviceStatus' });

  const { permission } = useNotificationPermission();
  const { state, register } = useDeviceRegistration();

  if (permission !== 'granted' || state === 'registered') return null;

  const isError = state === 'error';
  const isRegistering = state === 'registering';

  return (
    <div
      role="status"
      className={cn(
        'flex flex-col gap-3 rounded-lg border p-4 transition-colors sm:flex-row sm:items-center',
        isError
          ? 'border-destructive/20 bg-destructive/5'
          : 'border-primary/20 bg-primary/5',
        className,
      )}
    >
      <div className="flex flex-1 items-start gap-3">
        <div
          className={cn(
            'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full',
            isError ? 'bg-destructive/10' : 'bg-primary/10',
          )}
        >
          <BellOff
            className={cn(
              'size-4',
              isError ? 'text-destructive' : 'text-primary',
            )}
            aria-hidden
          />
        </div>

        <div className="space-y-0.5">
          <p
            className={cn(
              'text-sm font-semibold',
              isError ? 'text-destructive' : 'text-primary',
            )}
          >
            {isError ? t('error.title') : t('unregistered.title')}
          </p>
          <p className="text-muted-foreground text-sm">
            {isError ? t('error.description') : t('unregistered.description')}
          </p>
        </div>
      </div>

      <Button
        size="sm"
        variant={isError ? 'outline' : 'default'}
        onClick={register}
        disabled={isRegistering}
        className="w-full gap-1.5 sm:w-auto"
      >
        {isRegistering ? (
          <Loader2 className="size-3.5 animate-spin" aria-hidden />
        ) : isError ? (
          <RefreshCw className="size-3.5" aria-hidden />
        ) : (
          <Bell className="size-3.5" aria-hidden />
        )}

        {isRegistering
          ? t('registering')
          : isError
            ? t('error.action')
            : t('unregistered.action')}
      </Button>
    </div>
  );
});
