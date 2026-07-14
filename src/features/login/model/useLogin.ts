import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { useLogout } from '@/features/auth/index.initial';
import {
  setCredentials,
  broadcastRefreshed,
  toSessionCredentials,
} from '@/entities/session';
import type { ApiError } from '@/shared/api';
import { useAppDispatch } from '@/shared/config';

import { login } from '../api';
import type { LoginParams, LoginResponse } from './loginTypes';

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutUser = useLogout();

  const { t } = useTranslation('errors');

  return useMutation<LoginResponse, ApiError, LoginParams>({
    mutationFn: login,

    onSuccess: (data) => {
      const isAdmin = data.roles.includes('admin');

      if (isAdmin) {
        dispatch(setCredentials(toSessionCredentials(data)));

        broadcastRefreshed(data);

        navigate('/dashboard', { replace: true });
        return;
      }

      void logoutUser();

      toast.error(t('login.error'), {
        description: t('login.onlyAdmin'),
      });
    },

    onError: (error) => {
      const isInvalidCredentials = error.message === 'Invalid credentials';
      const toastDescription = isInvalidCredentials
        ? 'errors.invalidCredentials'
        : error.i18nKey;

      toast.error(t('login.error'), {
        description: t(toastDescription),
      });
    },
  });
}
