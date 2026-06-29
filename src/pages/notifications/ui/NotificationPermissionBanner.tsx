import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, BellOff, Info, Loader2, RefreshCw } from 'lucide-react';

import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib';

import { useNotificationPermission } from '../model/useNotificationPermission';
import type { NotificationPermissionState } from '../model/useNotificationPermission';

type Props = { className?: string };

type BannerConfig = {
  wrapperClass: string;
  iconWrapperClass: string;
  iconClass: string;
  titleClass: string;
};

const BANNER_CONFIG: Record<
  Exclude<NotificationPermissionState, 'granted'>,
  BannerConfig
> = {
  default: {
    wrapperClass: 'border-primary/20 bg-primary/5',
    iconWrapperClass: 'bg-primary/10',
    iconClass: 'text-primary',
    titleClass: 'text-primary',
  },
  denied: {
    wrapperClass: 'border-destructive/20 bg-destructive/5',
    iconWrapperClass: 'bg-destructive/10',
    iconClass: 'text-destructive',
    titleClass: 'text-destructive',
  },
  unsupported: {
    wrapperClass: 'border-border bg-muted/40',
    iconWrapperClass: 'bg-muted',
    iconClass: 'text-muted-foreground',
    titleClass: 'text-muted-foreground',
  },
};

const DENIED_STEP_COUNT = 4 as const;

export const NotificationPermissionBanner = memo(
  function NotificationPermissionBanner({ className }: Props) {
    const { t } = useTranslation('notifications', { keyPrefix: 'permission' });

    const { permission, requestPermission, isRequesting } =
      useNotificationPermission();

    if (permission === 'granted') return null;

    const config = BANNER_CONFIG[permission];

    if (permission === 'denied') {
      const steps = Array.from({ length: DENIED_STEP_COUNT }, (_, i) =>
        t(`denied.steps.${i}`),
      );

      return (
        <div
          role="status"
          className={cn(
            'rounded-lg border p-4 transition-colors',
            config.wrapperClass,
            className,
          )}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full',
                config.iconWrapperClass,
              )}
            >
              <BellOff className={cn('size-4', config.iconClass)} />
            </div>

            <div className="flex-1 space-y-1">
              <p className={cn('text-sm font-semibold', config.titleClass)}>
                {t('denied.title')}
              </p>
              <p className="text-muted-foreground text-sm">
                {t('denied.description')}
              </p>
            </div>
          </div>

          <ol
            aria-label={t('denied.stepsLabel')}
            className="mt-3 space-y-2 ps-11"
          >
            {steps.map((step, index) => (
              <li
                key={`step-${index}`}
                className="text-muted-foreground flex items-start gap-2.5 text-sm"
              >
                <span
                  className={cn(
                    'flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                    config.iconWrapperClass,
                    config.titleClass,
                  )}
                  aria-hidden
                >
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-4 flex justify-end ps-11">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="gap-1.5"
            >
              <RefreshCw className="size-3.5" />
              {t('denied.refresh')}
            </Button>
          </div>
        </div>
      );
    }

    if (permission === 'unsupported') {
      return (
        <div
          role="note"
          className={cn(
            'flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors',
            config.wrapperClass,
            className,
          )}
        >
          <Info className={cn('size-4 shrink-0', config.iconClass)} />
          <p className="text-muted-foreground text-sm">
            {t('unsupported.description')}
          </p>
        </div>
      );
    }

    return (
      <div
        role="status"
        className={cn(
          'flex flex-col gap-3 rounded-lg border p-4 transition-colors sm:flex-row sm:items-center',
          config.wrapperClass,
          className,
        )}
      >
        <div className="flex items-start gap-3 sm:flex-1">
          <div
            className={cn(
              'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full',
              config.iconWrapperClass,
            )}
          >
            <Bell className={cn('size-4', config.iconClass)} />
          </div>

          <div className="space-y-0.5">
            <p className={cn('text-sm font-semibold', config.titleClass)}>
              {t('default.title')}
            </p>
            <p className="text-muted-foreground text-sm">
              {t('default.description')}
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={requestPermission}
          disabled={isRequesting}
          className="w-full gap-1.5 sm:w-auto"
        >
          {isRequesting ? (
            <Loader2 className="size-3.5 animate-spin" aria-hidden />
          ) : (
            <Bell className="size-3.5" aria-hidden />
          )}
          {t('default.action')}
        </Button>
      </div>
    );
  },
);
