import { useTranslation } from 'react-i18next';

import type { DeliveryStatus } from '../model/deliveryTypes';
import { cn } from '@/shared/lib';
import { Badge } from '@/shared/ui';

type Props = {
  status: DeliveryStatus;
  className?: string;
};

const statusStyles: Record<DeliveryStatus, string> = {
  pending: 'bg-secondary text-secondary-foreground border-border',
  in_progress: 'bg-primary/10 text-primary border-primary/20',
  completed: 'bg-primary/10 text-primary border-primary/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

export const DeliveryStatusBadge = ({ status, className }: Props) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'deliveriesPage.status',
  });

  return (
    <Badge
      variant="outline"
      className={cn('font-medium', statusStyles[status], className)}
    >
      {t(status)}
    </Badge>
  );
};
