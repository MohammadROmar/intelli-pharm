import { createGift, type GiftPayload } from '@/entities/gift';
import { useCreateEntity } from '@/shared/model';

export function useCreateGift() {
  return useCreateEntity<GiftPayload>({
    queryKey: 'gifts',
    mutationFn: createGift,
    translationKey: 'gift',
  });
}
