import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BellRing, Loader2, RefreshCw } from 'lucide-react';

import { useDeviceRegistration } from '@/entities/device';
import { useAppSelector } from '@/shared/config';
import { cn } from '@/shared/lib';
import { useNotificationPermission } from '@/shared/notifications';
import { Button, Card, CardContent } from '@/shared/ui';

import { DENIED_STEP_COUNT, STATUS_PRESETS } from '../config/constants';
import type { ActivationStatus } from '../model/types';
import {
  isRetryableStatus,
  resolveActivationStatus,
} from '../lib/resolveActivationStatus';

type Props = {
  className?: string;
  detailed?: boolean;
  hideUnsupported?: boolean;
};

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

export function NotificationActivationBanner({
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

            {status !== 'unsupported' && (
              <ActivationAction
                status={status}
                isRegistering={isRegistering}
                label={actionLabel}
                onRefreshPermission={refreshPermission}
                onRegister={register}
              />
            )}
          </div>

          <DeniedStepsList steps={deniedSteps} label={t('denied.stepsLabel')} />
        </div>
      </CardContent>
    </Card>
  );
}
