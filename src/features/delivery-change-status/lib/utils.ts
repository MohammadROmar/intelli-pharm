import type { TFunction } from 'i18next';

import type {
  DeliveryStatus,
  ChangeDeliveryStatusValues,
  ChangeDeliveryStatusPayload,
  PaymentStatus,
} from '@/entities/delivery';

export function DELIVERY_TRANSITIONS(
  t: TFunction,
): Record<DeliveryStatus, { label: string; value: DeliveryStatus }[]> {
  const createOption = (status: DeliveryStatus) => ({
    label: t(`status.${status}`),
    value: status,
  });

  return {
    pending: [
      createOption('pending'),
      createOption('in_progress'),
      createOption('cancelled'),
      createOption('completed'),
    ],
    in_progress: [
      createOption('in_progress'),
      createOption('completed'),
      createOption('cancelled'),
    ],
    completed: [createOption('completed')],
    cancelled: [createOption('cancelled')],
  };
}

export function PAYMENT_TRANSITIONS(
  t: TFunction,
): Record<PaymentStatus, { label: string; value: PaymentStatus }[]> {
  const createOption = (status: PaymentStatus) => ({
    label: t(`paymentStatus.${status}`),
    value: status,
  });

  return {
    pending: [
      createOption('pending'),
      createOption('partial'),
      createOption('paid'),
    ],
    partial: [createOption('partial'), createOption('paid')],
    paid: [createOption('paid')],
  };
}

export function toPayload(
  values: ChangeDeliveryStatusValues,
): ChangeDeliveryStatusPayload {
  return {
    status: values.status as DeliveryStatus,
    payment_status:
      values.payment_status as ChangeDeliveryStatusPayload['payment_status'],
    check_notes: values.check_notes.trim() || undefined,
    payment_amount: values.payment_amount
      ? Number(values.payment_amount)
      : undefined,
    receiver_name: values.receiver_name.trim(),
  };
}
