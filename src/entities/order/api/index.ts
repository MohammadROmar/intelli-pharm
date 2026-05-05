import type { OrderListResponse, OrderStatus } from '../model/orderTypes';
import { apiClient, ApiError, statusToI18nKey } from '@/shared/api';

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

export async function getInfiniteOrders(page_number: string, name?: string) {
  const response = await getOrders({ page_number, name });

  if (!response.isSuccess || !response.data) {
    throw new ApiError(statusToI18nKey(response.statusCode));
  }

  const { data, meta } = response.data;

  return {
    items: data!,
    page: meta.current_page,
    pageSize: meta.per_page,
    totalPages: Math.max(meta.total / meta.per_page, 1),
    totalCount: meta.total,
  };
}
