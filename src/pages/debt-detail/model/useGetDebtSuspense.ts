import type { DebtDetail } from "@/entities/debt";
import { useSuspenseGetEntityById } from "@/shared/model";

export function useGetDebtSuspense(id: number) {
  return useSuspenseGetEntityById<DebtDetail>({
    id,
    queryKey: "debts",
    endpoint: "/erp/v1/debts",
  });
}
