import type { TFunction } from 'i18next';

import type {
  PaymentStatus,
  DeliveryStatus,
  ChangeDeliveryStatusValues,
  ChangeDeliveryStatusPayload,
} from '@/entities/delivery';

export function DELIVERY_TRANSITIONS(t: TFunction) {
  const statuses: DeliveryStatus[] = [
    'pending',
    'in_progress',
    'cancelled',
    'completed',
  ];

  return statuses.map((status) => ({
    label: t(`status.${status}`),
    value: status,
  }));
}

export function PAYMENT_TRANSITIONS(t: TFunction) {
  const statuses: PaymentStatus[] = ['pending', 'partial', 'paid'];

  return statuses.map((status) => ({
    label: t(`paymentStatus.${status}`),
    value: status,
  }));
}

export function toPayload(
  values: ChangeDeliveryStatusValues,
): ChangeDeliveryStatusPayload {
  return {
    status: values.status as DeliveryStatus,
    check_notes: values.check_notes.trim() || null,
    payment_amount: values.payment_amount ? Number(values.payment_amount) : 0,
    receiver_name: values.receiver_name.trim() || null,
  };
}
