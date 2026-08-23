import type {
  CreateOrderPayload,
  OrderListResponse,
  OrderMutationResult,
  OrderStatus,
  UpdateOrderPayload,
} from '../model/orderTypes';
import { apiClient, unwrapPaginatedApiResponse } from '@/shared/api';

export async function getOrders(
  params: Record<string, string | number | null | undefined>,
) {
  return apiClient.get<OrderListResponse>('/erp/v1/orders', { params });
}

export function createOrder(payload: CreateOrderPayload) {
  return apiClient.post<OrderMutationResult>('/erp/v1/orders', payload);
}

export function updateOrder({
  id,
  payload,
}: {
  id: number;
  payload: UpdateOrderPayload;
}) {
  return apiClient.put<OrderMutationResult>(`/erp/v1/orders/${id}`, payload);
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

export async function downloadOrderInvoice(orderId: number): Promise<Blob> {
  const response = await apiClient.get<Blob>(`/erp/v1/orders/${orderId}/pdf`, {
    responseType: 'blob',
  });

  const blob = response as unknown as Blob;

  if (!(blob instanceof Blob)) {
    throw new TypeError('The invoice response is not a valid file.');
  }

  return blob;
}
