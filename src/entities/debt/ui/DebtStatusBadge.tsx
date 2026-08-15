import { useTranslation } from 'react-i18next';
import {
  CircleAlert,
  CircleCheck,
  CircleDashed,
  CircleGauge,
  CircleHelp,
  Clock3,
  type LucideIcon,
} from 'lucide-react';

import { isDebtStatus } from '../model/debtConstants';
import type { DebtStatus } from '../model/debtTypes';
import { cn } from '@/shared/lib';
import { Badge } from '@/shared/ui';

type BadgeVariant = 'muted' | 'info' | 'success' | 'destructive';

type StatusConfig = {
  icon: LucideIcon;
  iconClassName: string;
  variant: BadgeVariant;
};

const STATUS_CONFIG = {
  pending: {
    icon: Clock3,
    iconClassName: 'text-muted-foreground',
    variant: 'muted',
  },
  unpaid: {
    icon: CircleDashed,
    iconClassName: 'text-muted-foreground',
    variant: 'muted',
  },
  partially_paid: {
    icon: CircleGauge,
    iconClassName: 'text-badge-info-text',
    variant: 'info',
  },
  paid: {
    icon: CircleCheck,
    iconClassName: 'text-badge-success-text',
    variant: 'success',
  },
  overdue: {
    icon: CircleAlert,
    iconClassName: 'text-destructive',
    variant: 'destructive',
  },
} satisfies Record<DebtStatus, StatusConfig>;

const UNKNOWN_STATUS_CONFIG: StatusConfig = {
  icon: CircleHelp,
  iconClassName: 'text-muted-foreground',
  variant: 'muted',
};

type DebtStatusValue = string | null | undefined;

function resolveStatus(status: DebtStatusValue) {
  if (!isDebtStatus(status)) {
    return {
      config: UNKNOWN_STATUS_CONFIG,
      translationKey: 'unknown' as const,
    };
  }

  return {
    config: STATUS_CONFIG[status],
    translationKey: status,
  };
}

type BadgeProps = {
  status: DebtStatusValue;
  withIcon?: boolean;
};

export function DebtStatusBadge({ status, withIcon = true }: BadgeProps) {
  const { t } = useTranslation('debts', { keyPrefix: 'status' });
  const { config, translationKey } = resolveStatus(status);
  const { icon: Icon, variant } = config;

  return (
    <Badge variant={variant} className="gap-1.5! font-medium!">
      {withIcon ? <Icon className="size-3" aria-hidden="true" /> : null}
      {t(translationKey)}
    </Badge>
  );
}

type IconProps = {
  status: DebtStatusValue;
  className?: string;
};

export function DebtStatusIcon({ status, className }: IconProps) {
  const { config } = resolveStatus(status);
  const { icon: Icon, iconClassName } = config;

  return (
    <Icon
      className={cn('size-5', iconClassName, className)}
      aria-hidden="true"
    />
  );
}
