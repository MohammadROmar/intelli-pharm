import { getOfferById, type Offer } from '@/entities/offer';
import { useGetEntityById } from '@/shared/model';

export function useGetOffer() {
  return useGetEntityById<Offer>({
    queryKey: 'offers',
    fetchFn: getOfferById,
  });
}
