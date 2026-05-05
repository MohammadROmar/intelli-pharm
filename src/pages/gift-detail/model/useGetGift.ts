import type { Gift } from '@/entities/gift';
import { useGetEntityById } from '@/shared/model';

export function useGetGift() {
  return useGetEntityById<Gift>({
    queryKey: 'gifts',
    endpoint: '/erp/v1/gifts',
  });
}
