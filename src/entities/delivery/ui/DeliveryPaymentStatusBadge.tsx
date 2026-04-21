import { useTranslation } from 'react-i18next';

import type { PaymentStatus } from '../model/deliveryTypes';
import { cn } from '@/shared/lib';
import { Badge } from '@/shared/ui';

type Props = {
  status: PaymentStatus;
  className?: string;
};

const paymentStatusStyles: Record<PaymentStatus, string> = {
  pending: 'bg-secondary text-secondary-foreground border-border',
  paid: 'bg-primary/10 text-primary border-primary/20',
  partial: 'bg-accent text-accent-foreground border-border',
};

export const DeliveryPaymentStatusBadge = ({ status, className }: Props) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'deliveriesPage.paymentStatus',
  });

  return (
    <Badge
      variant="outline"
      className={cn('font-medium', paymentStatusStyles[status], className)}
    >
      {t(status)}
    </Badge>
  );
};
