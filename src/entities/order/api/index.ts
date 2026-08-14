import type { OrderListResponse, OrderStatus } from '../model/orderTypes';
import { apiClient, unwrapPaginatedApiResponse } from '@/shared/api';

export async function getOrders(
  params: Record<string, string | number | null | undefined>,
) {
  return apiClient.get<OrderListResponse>('/erp/v1/orders', { params });
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

export async function cancelOrder({ id }: { id: number }) {
  return apiClient.patch(`/erp/v1/orders/${id}/cancel`);
}

export async function getInfiniteOrders(page_number: string, name?: string) {
  const response = await getOrders({ page_number, name });

  return unwrapPaginatedApiResponse(response);
}
