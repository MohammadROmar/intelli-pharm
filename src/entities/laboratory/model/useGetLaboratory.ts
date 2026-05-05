import type { LaboratoryDetail } from './laboratoryTypes';
import { useGetEntityById } from '@/shared/model';

export function useGetLaboratory() {
  return useGetEntityById<LaboratoryDetail>({
    queryKey: 'laboratories',
    endpoint: '/erp/v1/laboratories',
    withDualLanguage: true,
  });
}
