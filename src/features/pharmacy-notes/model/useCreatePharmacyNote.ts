import {
  createPharmacyNote,
  type CreatePharmacyNoteDto,
} from '@/entities/pharmacy';
import { useCreateEntity } from '@/shared/model';

export function useCreatePharmacyNote(pharmacyId: number) {
  return useCreateEntity({
    queryKey: 'pharmacies',
    translationKey: 'pharmacyNotes',
    mutationFn: (dto: CreatePharmacyNoteDto) =>
      createPharmacyNote(pharmacyId, dto),
  });
}
