import type { Offer } from '@/entities/offer';
import { useGetEntityById } from '@/shared/model';

export function useGetOffer() {
  return useGetEntityById<Offer>({
    queryKey: 'offers',
    endpoint: '/erp/v1/offers',
  });
}
