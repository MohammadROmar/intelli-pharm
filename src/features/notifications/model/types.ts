export type NotificationType =
  | 'order_created'
  | 'order_updated'
  | 'order_status_changed'
  | 'stock_low'
  | 'medicine_expiring'
  | 'pharmacy_updated'
  | 'delivery_updated';

export type FCMNotificationData = {
  type: NotificationType;
  title: string;
  body: string;
  entityId?: string;
};

export type BroadcastNotificationMessage = { data: FCMNotificationData };
