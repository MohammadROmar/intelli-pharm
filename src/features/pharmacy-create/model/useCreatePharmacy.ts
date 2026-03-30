import { createPharmacy, type Pharmacy } from '@/entities/pharmacy';
import { useCreateEntity } from '@/shared/model';

export function useCreatePharmacy() {
  return useCreateEntity<Pharmacy>({
    queryKey: 'pharmacies',
    mutationFn: createPharmacy,
    translationKey: 'pharmaciesPage.pharmacy',
  });
}
