import type {
  OrderDetail,
  OrderListResponse,
  OrderStatus,
} from '../model/orderTypes';
import { apiClient } from '@/shared/api';

export async function getOrders(
  params: Record<string, string | number | null | undefined>,
) {
  return apiClient.get<OrderListResponse>('/erp/v1/orders', { params });
}

export async function getOrderById(id: number) {
  return apiClient.get<OrderDetail>(`/erp/v1/orders/${id}`);
}

export async function changeOrderStatus({
  id,
  status,
}: {
  id: number;
  status: OrderStatus;
}) {
  return apiClient.patch(`/erp/v1/orders/${id}/change-status`, { status });
}
