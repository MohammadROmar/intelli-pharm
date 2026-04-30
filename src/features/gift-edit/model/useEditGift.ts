import { editGift, type GiftPayload } from '@/entities/gift';
import { useEditEntity } from '@/shared/model';

export function useEditGift(id: number) {
  return useEditEntity<GiftPayload>({
    queryKey: 'gifts',
    mutationFn: (payload) => editGift(id, payload),
    translationKey: 'giftsPage.gift',
  });
}
