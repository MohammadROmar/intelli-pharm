import { useMutation } from '@tanstack/react-query';

import { deleteOrder } from '@/entities/order';

export function useDeleteOrder() {
  return useMutation({
    mutationFn: deleteOrder,
  });
}
