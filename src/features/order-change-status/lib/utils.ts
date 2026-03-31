import type { ElementType } from 'react';
import { CheckCircle2, RefreshCw, Truck, XCircle } from 'lucide-react';

import type { OrderStatus } from '@/entities/order';

type StatusMeta = {
  icon: ElementType;
  destructive: boolean;
};

export const STATUS_META: Record<OrderStatus, StatusMeta> = {
  pending: { icon: RefreshCw, destructive: false },
  completed: { icon: CheckCircle2, destructive: false },
  processing: { icon: Truck, destructive: false },
  cancelled: { icon: XCircle, destructive: true },
};
