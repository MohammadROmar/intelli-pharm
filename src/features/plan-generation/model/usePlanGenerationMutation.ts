import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import {
  awaitPlanGeneration,
  PlanGenerationFailedError,
  PlanGenerationTimeoutError,
  type PlanDetail,
  type PlanGenerationRequest,
  type PlanGenerationStatus,
} from '@/entities/plan';
import {
  unwrapApiResponse,
  type ApiError,
  type ApiResponse,
} from '@/shared/api';
import { createDomainQueryKeys } from '@/shared/model';

const planQueryKeys = createDomainQueryKeys('plans');

type GenerationError =
  | ApiError
  | PlanGenerationFailedError
  | PlanGenerationTimeoutError;

type UsePlanGenerationMutationOptions<TPayload> = {
  initiate: (payload: TPayload) => Promise<ApiResponse<PlanGenerationRequest>>;

  mapInitiateError?: (error: ApiError) => string;

  mapGenerationError?: (error: PlanGenerationFailedError) => string;
};

export function usePlanGenerationMutation<TPayload>({
  initiate,
  mapInitiateError,
  mapGenerationError,
}: UsePlanGenerationMutationOptions<TPayload>) {
  const { t } = useTranslation();
  const { t: tErrors } = useTranslation('errors');

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const [status, setStatus] = useState<PlanGenerationStatus | null>(null);

  const mutation = useMutation<PlanDetail, GenerationError, TPayload>({
    mutationFn: async (payload) => {
      setStatus(null);

      const request = unwrapApiResponse(await initiate(payload));

      setStatus(request.status);

      return awaitPlanGeneration(request, {
        onStatusChange: setStatus,
      });
    },

    onSuccess: (plan) => {
      if (!isMountedRef.current) return;

      queryClient.invalidateQueries({
        queryKey: planQueryKeys.all,
      });

      toast.success(t('toasts.create.title'), {
        description: t('toasts.create.description', {
          item: t('entities.plan'),
        }),
        action: {
          label: t('toasts.show'),
          onClick: () => navigate(`/dashboard/plans/${plan.id}`),
        },
      });
    },

    onError: (error) => {
      if (!isMountedRef.current) return;

      if (error instanceof PlanGenerationFailedError) {
        toast.error(t('toasts.create.error'), {
          description: mapGenerationError
            ? mapGenerationError(error)
            : tErrors('unknown'),
        });

        return;
      }

      if (error instanceof PlanGenerationTimeoutError) {
        toast.error(t('toasts.create.error'), {
          description: tErrors('unknown'),
        });

        return;
      }

      toast.error(t('toasts.create.error'), {
        description: mapInitiateError
          ? mapInitiateError(error)
          : tErrors(error.i18nKey),
      });
    },
  });

  return {
    ...mutation,
    status,
  };
}
