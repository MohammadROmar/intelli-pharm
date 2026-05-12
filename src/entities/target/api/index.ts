import type {
  EditTargetDto,
  TargetAchievementResponse,
} from '../model/targetTypes';
import { apiClient } from '@/shared/api';

export async function editTarget(id: number, payload: EditTargetDto) {
  return apiClient.put(`/erp/v1/targets/${id}`, payload);
}

type Params = { id: number; params: Record<string, unknown> };

export async function getTargetAchievemnets({ id, params }: Params) {
  return apiClient.get<TargetAchievementResponse>(
    `/erp/v1/targets/${id}/achievement-histories`,
    { params },
  );
}
