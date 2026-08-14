import { cancelOrder } from "@/entities/order";
import { useEditEntity } from "@/shared/model";

export function useCancelOrder() {
  return useEditEntity<{ id: number }>({
    queryKey: "orders",
    mutationFn: cancelOrder,
    translationKey: "order",
  });
}
