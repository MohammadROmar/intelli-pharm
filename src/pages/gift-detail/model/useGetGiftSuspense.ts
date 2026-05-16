import type { Gift } from '@/entities/gift';
import { useSuspenseGetEntityById } from '@/shared/model';

export function useGetGiftSuspense(id: number) {
  return useSuspenseGetEntityById<Gift>({
    id,
    queryKey: 'gifts',
    endpoint: '/erp/v1/gifts',
  });
}
