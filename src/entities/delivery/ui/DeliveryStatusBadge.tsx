import { useTranslation } from 'react-i18next';

import type { DeliveryStatus } from '../model/deliveryTypes';
import { cn } from '@/shared/lib';
import { Badge } from '@/shared/ui';

type Props = {
  status: DeliveryStatus;
  className?: string;
};

const statusStyles = {
  pending: 'muted',
  in_progress: 'info',
  completed: 'success',
  cancelled: 'destructive',
} as const;

export const DeliveryStatusBadge = ({ status, className }: Props) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'deliveriesPage.status',
  });

  return (
    <Badge
      variant={statusStyles[status]}
      className={cn('font-medium', className)}
    >
      {t(status)}
    </Badge>
  );
};
