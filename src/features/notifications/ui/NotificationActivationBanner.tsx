import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BellOff,
  BellRing,
  CircleAlert,
  Info,
  Loader2,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react';

import { useDeviceRegistration } from '@/entities/device';
import { cn } from '@/shared/lib';
import {
  useNotificationPermission,
  type NotificationPermissionState,
} from '@/shared/notifications';
import { Button, Card, CardContent } from '@/shared/ui';
import { useAppSelector } from '@/shared/config';

type Props = {
  className?: string;
  detailed?: boolean;
  hideUnsupported?: boolean;
};

type ActivationStatus =
  | 'permission-default'
  | 'permission-denied'
  | 'unsupported'
  | 'device-unregistered'
  | 'device-error';

type StatusPreset = {
  icon: LucideIcon;
  containerClassName: string;
  iconWrapperClassName: string;
  iconClassName: string;
  titleKey: string;
  descriptionKey: string;
  actionKey: string;
};

const DENIED_STEP_COUNT = 4;

const STATUS_PRESETS: Record<ActivationStatus, StatusPreset> = {
  'permission-default': {
    icon: BellRing,
    containerClassName: 'border-primary/25 bg-primary/5',
    iconWrapperClassName: 'bg-primary/10',
    iconClassName: 'text-primary',
    titleKey: 'default.title',
    descriptionKey: 'default.description',
    actionKey: 'default.action',
  },
  'permission-denied': {
    icon: BellOff,
    containerClassName: 'border-destructive/25 bg-destructive/5',
    iconWrapperClassName: 'bg-destructive/10',
    iconClassName: 'text-destructive',
    titleKey: 'denied.title',
    descriptionKey: 'denied.description',
    actionKey: 'denied.action',
  },
  unsupported: {
    icon: Info,
    containerClassName: 'border-border bg-muted/40',
    iconWrapperClassName: 'bg-muted',
    iconClassName: 'text-muted-foreground',
    titleKey: 'unsupported.title',
    descriptionKey: 'unsupported.description',
    actionKey: '',
  },
  'device-unregistered': {
    icon: CircleAlert,
    containerClassName: 'border-primary/25 bg-primary/5',
    iconWrapperClassName: 'bg-primary/10',
    iconClassName: 'text-primary',
    titleKey: 'unregistered.title',
    descriptionKey: 'unregistered.description',
    actionKey: 'unregistered.action',
  },
  'device-error': {
    icon: CircleAlert,
    containerClassName: 'border-destructive/25 bg-destructive/5',
    iconWrapperClassName: 'bg-destructive/10',
    iconClassName: 'text-destructive',
    titleKey: 'error.title',
    descriptionKey: 'error.description',
    actionKey: 'error.action',
  },
};

function resolveActivationStatus(
  permission: NotificationPermissionState,
  registrationState: ReturnType<typeof useDeviceRegistration>['state'],
): ActivationStatus | null {
  if (permission === 'default') return 'permission-default';
  if (permission === 'denied') return 'permission-denied';
  if (permission === 'unsupported') return 'unsupported';
  if (registrationState === 'registered') return null;

  return registrationState === 'error' ? 'device-error' : 'device-unregistered';
}

function isRetryableStatus(status: ActivationStatus): boolean {
  return status === 'permission-denied' || status === 'device-error';
}

type ActivationActionProps = {
  status: ActivationStatus;
  isRegistering: boolean;
  label: string;
  onRefreshPermission: () => void;
  onRegister: () => void;
};

function ActivationActionIcon({
  status,
  isRegistering,
}: {
  status: ActivationStatus;
  isRegistering: boolean;
}) {
  const className = cn('size-3 shrink-0', isRegistering && 'animate-spin');

  if (isRegistering) return <Loader2 className={className} aria-hidden />;

  return isRetryableStatus(status) ? (
    <RefreshCw className={className} aria-hidden />
  ) : (
    <BellRing className={className} aria-hidden />
  );
}

const ActivationAction = memo(function ActivationAction({
  status,
  isRegistering,
  label,
  onRefreshPermission,
  onRegister,
}: ActivationActionProps) {
  const handleClick =
    status === 'permission-denied' ? onRefreshPermission : onRegister;

  return (
    <Button
      type="button"
      size="sm"
      variant={isRetryableStatus(status) ? 'outline' : 'default'}
      onClick={handleClick}
      disabled={isRegistering}
      className="h-7! w-full shrink-0 items-center gap-1.5 px-2.5! text-xs sm:w-auto"
    >
      <ActivationActionIcon status={status} isRegistering={isRegistering} />
      {label}
    </Button>
  );
});

type DeniedStepsListProps = {
  steps: string[];
  label: string;
};

const DeniedStepsList = memo(function DeniedStepsList({
  steps,
  label,
}: DeniedStepsListProps) {
  if (steps.length === 0) return null;

  return (
    <details className="border-border/70 border-t pt-2">
      <summary className="text-muted-foreground hover:text-foreground w-fit cursor-pointer text-xs font-medium transition-colors">
        {label}
      </summary>

      <ol aria-label={label} className="grid gap-1.5 pt-2 sm:grid-cols-2">
        {steps.map((step, index) => (
          <li
            key={`permission-step-${index}`}
            className="text-muted-foreground flex items-start gap-2 text-xs leading-5"
          >
            <span
              aria-hidden
              className="bg-destructive/10 text-destructive mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
            >
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </details>
  );
});

export const NotificationActivationBanner = memo(
  function NotificationActivationBanner({
    className,
    detailed = false,
    hideUnsupported = false,
  }: Props) {
    const { t } = useTranslation('notifications', { keyPrefix: 'activation' });
    const { permission, refreshPermission } = useNotificationPermission();

    const sessionEmail = useAppSelector(
      (state) => state.session.user?.email ?? null,
    );
    const email = sessionEmail?.trim() || null;

    const { state, register } = useDeviceRegistration(email);

    const status = resolveActivationStatus(permission, state);
    const isRegistering = state === 'registering';

    const deniedSteps = useMemo(
      () =>
        detailed && status === 'permission-denied'
          ? Array.from({ length: DENIED_STEP_COUNT }, (_, index) =>
              t(`denied.steps.${index}`),
            )
          : [],
      [detailed, status, t],
    );

    if (status === null || (status === 'unsupported' && hideUnsupported)) {
      return null;
    }

    const preset = STATUS_PRESETS[status];
    const StatusIcon = preset.icon;
    const actionLabel = t(isRegistering ? 'registering' : preset.actionKey);

    return (
      <Card
        role="status"
        aria-live="polite"
        className={cn('py-2!', preset.containerClassName, className)}
      >
        <CardContent className="flex min-h-16! gap-2.5 p-3!">
          <div className="flex w-full flex-col gap-2">
            <div className="flex min-w-0 flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-lg sm:size-9',
                    preset.iconWrapperClassName,
                  )}
                >
                  <StatusIcon
                    className={cn(
                      'size-4 shrink-0 sm:size-5',
                      preset.iconClassName,
                    )}
                    aria-hidden
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm leading-5 font-medium">
                    {t(preset.titleKey)}
                  </h2>
                  <p
                    className={cn(
                      'text-muted-foreground text-xs leading-5',
                      !detailed && 'sm:line-clamp-1',
                    )}
                  >
                    {t(preset.descriptionKey)}
                  </p>
                </div>
              </div>

              {status !== 'unsupported' ? (
                <ActivationAction
                  status={status}
                  isRegistering={isRegistering}
                  label={actionLabel}
                  onRefreshPermission={refreshPermission}
                  onRegister={register}
                />
              ) : null}
            </div>

            <DeniedStepsList
              steps={deniedSteps}
              label={t('denied.stepsLabel')}
            />
          </div>
        </CardContent>
      </Card>
    );
  },
);
