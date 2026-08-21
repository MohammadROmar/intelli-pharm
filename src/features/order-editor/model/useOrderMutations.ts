import {
  createOrder,
  updateOrder,
  type CreateOrderPayload,
  type OrderMutationResult,
  type UpdateOrderPayload,
} from '@/entities/order';
import type { ApiResponse } from '@/shared/api';
import { useCreateEntity, useEditEntity } from '@/shared/model';

export function useCreateOrder() {
  return useCreateEntity<CreateOrderPayload, ApiResponse<OrderMutationResult>>({
    queryKey: 'orders',
    translationKey: 'order',
    mutationFn: createOrder,
    navigatePath: '/dashboard/orders',
  });
}

export function useUpdateOrder(orderId: number, onUpdated?: () => void) {
  return useEditEntity<UpdateOrderPayload, ApiResponse<OrderMutationResult>>({
    queryKey: 'orders',
    translationKey: 'order',
    mutationFn: async (payload) => {
      const response = await updateOrder({ id: orderId, payload });
      onUpdated?.();

      return response;
    },
    redirectTo: `/dashboard/orders/${orderId}`,
  });
}
