import type { TFunction } from 'i18next';

import type { OrderStatus } from '@/entities/order';

const ORDER_STATUSES: OrderStatus[] = [
  'pending',
  'processing',
  'completed',
  'cancelled',
];

export function getStatusesCodes(t: TFunction) {
  const statuses = ORDER_STATUSES.map((status) => ({
    value: status,
    label: t(`status.${status}`),
  }));

  return statuses;
}
