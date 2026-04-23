export type DeliveryStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'partial';

export type AssignDeliveryPayload = {
  user_id: number;
  order_id: number;
  scheduled_at: string;
  notes: string | undefined;
};

export type DeliveryConfirmation = {
  id: number;
  delivery_id: number;
  check_notes: string;
  payment_amount: number;
  receiver_name: string;
  created_at: string;
};

export type DeliveryOrderItem = {
  id: number;
  medicine: { id: number; commercial_name: string };
  quantity: number;
  total_price: number;
};

export type DeliveryOrder = {
  id: number;
  pharmacy: { id: number; name: string };
  total_amount: number;
  items: DeliveryOrderItem[];
};

export type DeliveryListItem = {
  id: number;
  user_id: number;
  order_id: number;
  status: DeliveryStatus;
  payment_status: PaymentStatus;
  scheduled_at: string;
  completed_at: string | null;
  notes: string;
  required_payment_amount: string;
  created_at: string;
  updated_at: string;
  number_of_items: number;
  pharmacy_name: string;
  distributor_name: string;
};

export type DeliveryListResponse = {
  data: DeliveryListItem[];
  meta: { current_page: number; per_page: number; to: number; total: number };
};

export type DeliveryDetail = {
  id: number;
  user_id: number;
  distributor_name: string;
  order_id: number;
  status: DeliveryStatus;
  payment_status: PaymentStatus;
  scheduled_at: string;
  completed_at: string | null;
  notes: string | null;
  required_payment_amount: number;
  number_of_items: number;
  pharmacy_id: number;
  pharmacy_name: string;
  confirmations: DeliveryConfirmation[];
  order: DeliveryOrder;
  created_at: string;
  updated_at: string;
};

export const DELIVERY_STATUS_TRANSITIONS: Record<
  DeliveryStatus,
  DeliveryStatus[]
> = {
  pending: ['in_progress', 'cancelled'],
  in_progress: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};
