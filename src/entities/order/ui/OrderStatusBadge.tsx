import { useTranslation } from 'react-i18next';
import { Activity } from 'lucide-react';

import type { OrderStatus } from '../model/orderTypes';
import { Badge } from '@/shared/ui';

const STATUS_VARIANT = {
  pending: 'muted',
  processing: 'info',
  cancelled: 'destructive',
  completed: 'success',
} as const;

type Props = { status: OrderStatus; withIcon?: boolean };

export function OrderStatusBadge({ status, withIcon = true }: Props) {
  const { t } = useTranslation('orders', {
    keyPrefix: 'status',
  });

  return (
    <Badge
      variant={STATUS_VARIANT[status]}
      className={'font-normal capitalize'}
    >
      {withIcon && <Activity />}
      {t(status)}
    </Badge>
  );
}
