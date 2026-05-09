import type { PaginatedResponse } from '@/shared/api';

export type DeliveryStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'partial';

export type DeliveryConfirmation = {
  id: number;
  delivery_id: number;
  check_notes: string;
  payment_amount: string;
  receiver_name: string;
  created_at: string;
};

export type DeliveryOrderItem = {
  id: number;
  medicine: { id: number; commercial_name: string };
  quantity: number;
  unit_price: string;
  total_price: string;
  is_gift: 0 | 1;
  offer_id: number | null;
  gift_id: number | null;
};

export type DeliveryOrder = {
  id: number;
  pharmacy: { id: number; name: string };
  total_amount: string;
  percentage: string | null;
  final_total: string;
  discount: string;
  offer_id: number | null;
  items: DeliveryOrderItem[];
};

type BaseDelivery = {
  id: number;
  user_id: number;
  order_id: number;
  pharmacy_id: number;
  status: DeliveryStatus;
  payment_status: PaymentStatus;
  scheduled_at: string;
  completed_at: string | null;
  notes: string | null;
  required_payment_amount: string;
  number_of_items: number;
  pharmacy_name: string;
  distributor_name: string;
  created_at: string;
  updated_at: string;
};

export type DeliveryListItem = BaseDelivery;

export type DeliveryDetail = BaseDelivery & {
  confirmations: DeliveryConfirmation[];
  order: DeliveryOrder;
};

export type DeliveryListResponse = PaginatedResponse<DeliveryListItem>;

export type AssignDeliveryPayload = {
  user_id: number;
  order_id: number;
  scheduled_at: string;
  notes: string | undefined;
};

export type ChangeDeliveryStatusPayload = {
  status: DeliveryStatus;
  payment_status: PaymentStatus;
  check_notes: string | undefined;
  payment_amount: number | undefined;
  receiver_name: string;
};

export type ChangeDeliveryStatusValues = {
  status: DeliveryStatus | '';
  payment_status: PaymentStatus | '';
  check_notes: string;
  payment_amount: string;
  receiver_name: string;
};
