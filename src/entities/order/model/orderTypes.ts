import type { PaginatedResponse } from '@/shared/api';

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

type Item = { id: number; commercial_name: string };

export type OrderItem = {
  order_id: number;
  medicine_id: number;
  quantity: number;
  unit_price: string;
  medicine: Item;
};

export type OrderListItem = {
  id: number;
  created_by: number;
  pharmacy_id: number;
  warehouse_id: number;
  status: OrderStatus;
  total_amount: string;
  total_quantity: string;
  created_at: string;
  updated_at: string;
  pharmacy: { id: number; name: string };
};

export type OrderDetail = { items: OrderItem[] } & OrderListItem;

export type OrderFilters = {
  status?: string | null;
  date_from?: string | null;
  date_to?: string | null;
  pharmacy?: string | null;
  min_total?: string | null;
  max_total?: string | null;
};

export type OrderListResponse = PaginatedResponse<OrderListItem>;
