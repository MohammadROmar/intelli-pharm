import type { QueryKey } from '@tanstack/react-query';

import type { NotificationType } from '../model/types';

export const NOTIFICATION_QUERY_MAP: Record<NotificationType, QueryKey[]> = {
  order_created: [['orders']],
  order_updated: [['orders']],
  order_status_changed: [['orders']],
  stock_low: [['medicines']],
  medicine_expiring: [['medicines']],
  pharmacy_updated: [['pharmacies']],
  delivery_updated: [['orders'], ['deliveries']],
};
