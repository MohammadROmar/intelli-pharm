import type { Gift, GiftResponse } from '@/entities/gift';
import { useGetEntities } from '@/shared/model';

export function useGetGifts() {
  return useGetEntities<GiftResponse, Gift>({
    queryKey: 'gifts',
  });
}
