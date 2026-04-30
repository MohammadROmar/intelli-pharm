import { getGiftById, type Gift } from '@/entities/gift';
import { useGetEntityById } from '@/shared/model';

export function useGetGift() {
  return useGetEntityById<Gift>({
    queryKey: 'gifts',
    fetchFn: getGiftById,
  });
}
