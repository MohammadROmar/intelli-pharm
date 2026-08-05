import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import {
  setCredentials,
  broadcastRefreshed,
  toSessionCredentials,
} from '@/entities/session';
import type { ApiError } from '@/shared/api';
import { useAppDispatch } from '@/shared/config';

import { login } from '../api';
import { getLoginErrorKey } from '../lib/getLoginErrorKey';
import { useLogout } from './useLogout';
import type { LoginParams, LoginResponse } from './loginTypes';

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutUser = useLogout();

  const { t } = useTranslation('errors', { keyPrefix: 'login' });

  return useMutation<LoginResponse, ApiError, LoginParams>({
    mutationFn: login,

    onSuccess: (data) => {
      const canAccessDashboard = data.permissions.includes('dashboard.access');

      if (canAccessDashboard) {
        dispatch(setCredentials(toSessionCredentials(data)));
        broadcastRefreshed(data);
        navigate('/dashboard', { replace: true });
        return;
      }

      void logoutUser();

      toast.error(t('error'), {
        description: t('noDashboardAccess'),
      });
    },

    onError: (error) => {
      toast.error(t('error'), {
        description: t(getLoginErrorKey(error)),
      });
    },
  });
}
