import { editOffer, type EditOfferDto } from '@/entities/offer';
import { useEditEntity } from '@/shared/model';

export function useEditOffer(id: number) {
  return useEditEntity<EditOfferDto>({
    queryKey: 'offers',
    mutationFn: (payload) => editOffer(id, payload),
    translationKey: 'offer',
  });
}
