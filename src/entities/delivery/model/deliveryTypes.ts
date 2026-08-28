import type { PaginatedResponse } from '@/shared/api';

export type DeliveryStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type DeliveryConfirmation = {
  id: number;
  delivery_id: number;
  check_notes: string;
  payment_amount: string;
  receiver_name: string;
  receipt_image: string | null;
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
  paid_amount: string;
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
  scheduled_at: string;
  completed_at: string | null;
  notes: string | null;
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

export type DeliveryFilters = {
  status?: DeliveryStatus | null;
  pharmacy_id?: string | null;
  scheduled_at_before?: string | null;
  scheduled_at_after?: string | null;
};

export type AssignDeliveryPayload = {
  user_id: number;
  order_id: number;
  scheduled_at: string;
  notes: string | undefined;
};

export type ChangeDeliveryStatusPayload = {
  status: DeliveryStatus;
  check_notes: string | null;
  payment_amount: number;
  receiver_name: string | null;
};

export type ChangeDeliveryStatusValues = {
  status: DeliveryStatus | '';
  check_notes: string;
  payment_amount: string;
  receiver_name: string;
};
