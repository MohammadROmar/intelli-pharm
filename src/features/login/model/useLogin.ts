import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { LoginParams, LoginResponse } from './loginTypes';
import { login } from '../api/api';
import { setCredentials } from '@/entities/session';
import type { ApiResponse, ApiError } from '@/shared/api';
import { useAppDispatch } from '@/shared/config';

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  return useMutation<ApiResponse<LoginResponse>, ApiError, LoginParams>({
    mutationFn: login,

    onSuccess: (data) => {
      dispatch(
        setCredentials({
          accessToken: data.data!.access_token,
          refreshToken: data.data!.refresh_token,
          roles: data.data!.roles,
          user: { email: data.data!.email, name: data.data!.name },
        }),
      );

      navigate('/dashboard', { replace: true });
    },

    onError: (error) => {
      toast.error(t('loginPage.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
