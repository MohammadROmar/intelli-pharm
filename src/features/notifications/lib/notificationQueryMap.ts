import type { QueryKey } from '@tanstack/react-query';

import { createDomainQueryKeys } from '@/shared/model';

import { isNotificationType, type NotificationType } from '../model/types';

const NOTIFICATION_QUERY_DOMAINS: Record<NotificationType, readonly string[]> =
  {
    order_created: ['orders'],
    order_updated: ['orders'],
    order_status_changed: ['orders'],
    stock_low: ['medicines'],
    medicine_expiring: ['medicines'],
    pharmacy_updated: ['pharmacies'],
    delivery_updated: ['orders', 'deliveries'],
    'shared.notification': [],
    'erp.stock.low': ['medicines'],
    'erp.stock.expiry': ['medicines'],
  };

export function getNotificationQueryKeys(type?: string): QueryKey[] {
  if (!isNotificationType(type)) return [];

  return NOTIFICATION_QUERY_DOMAINS[type].map(
    (domain) => createDomainQueryKeys(domain).all,
  );
}
