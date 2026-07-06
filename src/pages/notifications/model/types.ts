import type { PaginatedResponse } from '@/shared/api';

export type NotificationType =
  | 'shared.notification'
  | 'erp.stock.low'
  | 'erp.stock.expiry';

export type ReadStatusFilter = 'all' | 'read' | 'unread';

export type Notification = {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  read_at: string | null;
  created_at: string;
};

export type NotificationsResponse = PaginatedResponse<Notification>;

export type NotificationsParams = {
  page: number;
  per_page: number;
  read_status?: Exclude<ReadStatusFilter, 'all'>;
};
