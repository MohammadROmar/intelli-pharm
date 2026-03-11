import type { Order } from '../model/orderTypes';
import { apiClient } from '@/shared/api';

export async function getOrders(): Promise<Order[]> {
  const { data } = await apiClient.get('/erp/v1/orders');
  return data;
}

export async function deleteOrder(id: number) {
  await apiClient.delete(`/erp/v1/orders/${id}`);
}
