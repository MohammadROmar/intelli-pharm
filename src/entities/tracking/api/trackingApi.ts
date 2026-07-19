import { apiClient, unwrapApiResponse } from '@/shared/api';

import type { LocationEvent } from '../model/types';

export async function fetchTrackingInit(): Promise<LocationEvent[]> {
  const response = await apiClient.get<LocationEvent[]>('/tracking/v1/init');
  return unwrapApiResponse(response);
}
