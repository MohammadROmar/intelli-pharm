import { useTranslation } from 'react-i18next';
import { Activity } from 'lucide-react';

import type { OrderStatus } from '../model/orderTypes';
import { cn } from '@/shared/lib';
import { Badge } from '@/shared/ui';

const STATUS_VARIANT: Record<
  OrderStatus,
  'default' | 'secondary' | 'outline' | 'destructive'
> = {
  pending: 'secondary',
  completed: 'default',
  processing: 'default',
  cancelled: 'destructive',
};

type Props = { status: OrderStatus; withIcon?: boolean };

export function OrderStatusBadge({ status, withIcon = true }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'ordersPage.status',
  });

  const isCompleted = status === 'completed';

  return (
    <Badge
      variant={STATUS_VARIANT[status]}
      className={cn(
        'font-normal capitalize',
        isCompleted && 'bg-green-500! text-white!',
      )}
    >
      {withIcon && <Activity />}
      {t(status)}
    </Badge>
  );
}
