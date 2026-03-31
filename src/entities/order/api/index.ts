import type {
  OrderDetail,
  OrderFilters,
  OrderListResponse,
  OrderStatus,
} from '../model/orderTypes';
import { apiClient } from '@/shared/api';

const PER_PAGE = 10;

export async function getOrders(page: string | null, filters: OrderFilters) {
  return apiClient.get<OrderListResponse>('/erp/v1/orders', {
    params: { page_number: page ?? 1, per_page: PER_PAGE, ...filters },
  });
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
