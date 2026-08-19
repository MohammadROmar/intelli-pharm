import i18n from '@/shared/i18n';
import { apiClient } from '@/shared/api';

import type {
  InitiateDeliveryPlanPayload,
  InitiateRepPlanPayload,
  PlanGenerationRequest,
} from '../model/types';

function currentAcceptLanguage(): 'ar' | 'en' {
  return i18n.language?.startsWith('ar') ? 'ar' : 'en';
}

export function initiateRepPlan(payload: InitiateRepPlanPayload) {
  return apiClient.post<PlanGenerationRequest>(
    '/planner/v1/plans/initiate',
    payload,
    { headers: { 'Accept-Language': currentAcceptLanguage() } },
  );
}

export function initiateDeliveryPlan(payload: InitiateDeliveryPlanPayload) {
  return apiClient.post<PlanGenerationRequest>(
    '/planner/v1/plans/initiate-from-deliveries',
    payload,
    { headers: { 'Accept-Language': currentAcceptLanguage() } },
  );
}

export function getPlanGenerationRequest(requestId: string) {
  return apiClient.get<PlanGenerationRequest>(
    `/planner/v1/plans/generation-requests/${requestId}`,
  );
}
