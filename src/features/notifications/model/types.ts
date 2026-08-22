import type { LucideIcon } from 'lucide-react';

export type NotificationType =
  | 'order_created'
  | 'order_updated'
  | 'order_status_changed'
  | 'stock_low'
  | 'medicine_expiring'
  | 'pharmacy_updated'
  | 'delivery_updated'
  | 'shared.notification'
  | 'erp.stock.low'
  | 'erp.stock.expiry';

const NOTIFICATION_TYPES = new Set<string>([
  'order_created',
  'order_updated',
  'order_status_changed',
  'stock_low',
  'medicine_expiring',
  'pharmacy_updated',
  'delivery_updated',
  'shared.notification',
  'erp.stock.low',
  'erp.stock.expiry',
]);

export type FCMNotificationData = {
  id?: string;
  type?: string;
  title?: string;
  body?: string;
  entityId?: string;
  link?: string;
};

export type ServiceWorkerNotificationMessage = {
  type: string;
  payload: {
    messageId?: string;
    data?: Record<string, unknown>;
    fallbackBody?: string;
    fallbackTitle?: string;
  };
};

export type NotificationsRuntimeErrorContext =
  | 'legacy-storage-cleanup'
  | 'device-registration'
  | 'foreground-listener';

export type NotificationsRuntimeErrorHandler = (
  error: unknown,
  context: NotificationsRuntimeErrorContext,
) => void;

export type NotificationsParams = {
  page: number;
  per_page: number;
  read_status?: 'read' | 'unread';
};

export function isNotificationType(
  value: string | undefined,
): value is NotificationType {
  return typeof value === 'string' && NOTIFICATION_TYPES.has(value);
}

function readOptionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

export function parseNotificationData(value: unknown): FCMNotificationData {
  if (!value || typeof value !== 'object') return {};

  const data = value as Record<string, unknown>;

  return {
    id: readOptionalString(data.id),
    type: readOptionalString(data.type),
    title: readOptionalString(data.title),
    body: readOptionalString(data.body),
    entityId: readOptionalString(data.entityId),
    link: readOptionalString(data.link),
  };
}

export type ActivationStatus =
  | 'permission-default'
  | 'permission-denied'
  | 'unsupported'
  | 'device-unregistered'
  | 'device-error';

export type StatusPreset = {
  icon: LucideIcon;
  containerClassName: string;
  iconWrapperClassName: string;
  iconClassName: string;
  titleKey: string;
  descriptionKey: string;
  actionKey: string;
};
