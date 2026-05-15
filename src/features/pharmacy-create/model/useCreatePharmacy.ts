import { createPharmacy, type PharmacyDetail } from '@/entities/pharmacy';
import { useCreateEntity } from '@/shared/model';

export function useCreatePharmacy() {
  return useCreateEntity<PharmacyDetail>({
    queryKey: 'pharmacies',
    mutationFn: createPharmacy,
    translationKey: 'pharmacy',
  });
}
