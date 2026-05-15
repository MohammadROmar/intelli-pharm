import { useTranslation } from 'react-i18next';

import type { PaymentStatus } from '../model/deliveryTypes';
import { cn } from '@/shared/lib';
import { Badge } from '@/shared/ui';

type Props = { status: PaymentStatus; className?: string };

const paymentStatusStyles = {
  pending: 'muted',
  partial: 'info',
  paid: 'success',
} as const;

export const DeliveryPaymentStatusBadge = ({ status, className }: Props) => {
  const { t } = useTranslation('deliveries', {
    keyPrefix: 'paymentStatus',
  });

  return (
    <Badge
      variant={paymentStatusStyles[status]}
      className={cn('font-medium', className)}
    >
      {t(status)}
    </Badge>
  );
};
