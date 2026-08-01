import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import {
  broadcastRefreshed,
  setCredentials,
  toSessionCredentials,
} from '@/entities/session';
import { resetDeviceRegistrationState } from '@/entities/device';
import type { ApiError } from '@/shared/api';
import { useAppDispatch } from '@/shared/config';
import { clearRegistrationFingerprint } from '@/shared/notifications';

import { login } from '../api';
import type { LoginParams, LoginResponse } from './loginTypes';
import { useLogout } from './useLogout';

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutUser = useLogout();
  const { t } = useTranslation('errors');

  return useMutation<LoginResponse, ApiError, LoginParams>({
    mutationFn: login,

    onSuccess: async (data) => {
      if (!data.roles.includes('admin')) {
        await logoutUser();

        toast.error(t('login.error'), {
          description: t('login.onlyAdmin'),
        });
        return;
      }

      clearRegistrationFingerprint();
      resetDeviceRegistrationState();
      dispatch(setCredentials(toSessionCredentials(data)));
      broadcastRefreshed(data);
      navigate('/dashboard', { replace: true });
    },

    onError: (error) => {
      const toastDescription =
        error.status === 401 ? 'errors.invalidCredentials' : error.i18nKey;

      toast.error(t('login.error'), {
        description: t(toastDescription),
      });
    },
  });
}
