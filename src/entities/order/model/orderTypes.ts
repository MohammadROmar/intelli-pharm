import type { PaginatedResponse } from '@/shared/api';

export type OrderRequestItem = {
  medicine_id: number;
  quantity: number;
};

export type CreateOrderPayload = {
  pharmacy_id: number;
  warehouse_id: number;
  items: OrderRequestItem[];
  notes?: string;
};

export type UpdateOrderPayload = {
  items: OrderRequestItem[];
};

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

type OrderMedicine = { id: number; commercial_name: string };

export type OrderItem = {
  id: number;
  order_id: number;
  medicine_id: number;
  quantity: number;
  unit_price: string;
  total_price: string;
  is_gift: 0 | 1;
  offer_id: number | null;
  gift_id: number | null;
  created_at: string | null;
  updated_at: string | null;
  medicine: OrderMedicine;
};

export type OrderListItem = {
  id: number;
  created_by: number;
  created_by_name: string;
  pharmacy_id: number;
  warehouse_id: number;
  status: OrderStatus;
  total_amount: string;
  total_quantity: string;
  percentage: string | null;
  final_total: string;
  discount: string;
  offer_id: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  pharmacy: { id: number; name: string };
};

export type OrderDetail = {
  items: OrderItem[];
  paid_amount?: string | null;
} & OrderListItem;

export type OrderMutationItem = Omit<OrderItem, 'medicine'>;

export type OrderMutationResult = {
  id: number;
  created_by: number;
  created_by_name?: string;
  pharmacy_id: number;
  warehouse_id: number;
  status: OrderStatus | null;
  total_amount: string | number;
  percentage: string | null;
  final_total: string | number;
  paid_amount: string | number | null;
  discount: string | number;
  offer_id: number | null;
  created_at: string;
  updated_at: string;
  notes: string | null;
  items?: OrderMutationItem[];
};

export type OrderFilters = {
  status?: string | null;
  date_from?: string | null;
  date_to?: string | null;
  pharmacy?: string | null;
  min_total?: string | null;
  max_total?: string | null;
};

export type OrderListResponse = PaginatedResponse<OrderListItem>;
