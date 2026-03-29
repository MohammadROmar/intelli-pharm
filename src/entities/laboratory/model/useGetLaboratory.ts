import type { LaboratoryDetail } from './laboratoryTypes';
import { getLaboratoryById } from '../api';
import { useGetEntityById } from '@/shared/model';

export function useGetLaboratory() {
  return useGetEntityById<LaboratoryDetail>({
    queryKey: 'laboratories',
    fetchFn: getLaboratoryById,
  });
}
