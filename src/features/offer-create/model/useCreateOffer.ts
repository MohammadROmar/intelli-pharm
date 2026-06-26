import { createOffer, type CreateOfferDto } from '@/entities/offer';
import { useCreateEntity } from '@/shared/model';

export function useCreateOffer() {
  return useCreateEntity<CreateOfferDto>({
    queryKey: 'offers',
    mutationFn: createOffer,
    translationKey: 'offer',
    navigatePath: '/dashboard/promotions/offers',
  });
}
