import { useTranslation } from 'react-i18next';
import {
  CircleAlert,
  CircleCheck,
  CircleDashed,
  CircleGauge,
  type LucideIcon,
} from 'lucide-react';

import type { DebtStatus } from '../model/debtTypes';
import { cn } from '@/shared/lib';
import { Badge } from '@/shared/ui';

type BadgeVariant = 'muted' | 'info' | 'success' | 'destructive';

const STATUS_CONFIG = {
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
} satisfies Record<
  DebtStatus,
  {
    icon: LucideIcon;
    iconClassName: string;
    variant: BadgeVariant;
  }
>;

type BadgeProps = {
  status: DebtStatus;
  withIcon?: boolean;
};

export function DebtStatusBadge({ status, withIcon = true }: BadgeProps) {
  const { t } = useTranslation('debts', { keyPrefix: 'status' });
  const { icon: Icon, variant } = STATUS_CONFIG[status];

  return (
    <Badge variant={variant} className="gap-1.5! font-medium!">
      {withIcon ? <Icon className="size-3" aria-hidden="true" /> : null}
      {t(status)}
    </Badge>
  );
}

type IconProps = {
  status: DebtStatus;
  className?: string;
};

export function DebtStatusIcon({ status, className }: IconProps) {
  const { icon: Icon, iconClassName } = STATUS_CONFIG[status];

  return (
    <Icon
      className={cn('size-5', iconClassName, className)}
      aria-hidden="true"
    />
  );
}
