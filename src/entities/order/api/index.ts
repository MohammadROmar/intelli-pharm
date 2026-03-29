import type { Order } from '../model/orderTypes';
import { apiClient } from '@/shared/api';

export async function getOrders() {
  return apiClient.get<Order[]>('/erp/v1/orders');
}
