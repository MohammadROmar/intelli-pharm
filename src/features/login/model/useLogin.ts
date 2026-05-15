import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { LoginParams, LoginResponse } from './loginTypes';
import { login } from '../api';
import { setCredentials } from '@/entities/session';
import type { ApiError } from '@/shared/api';
import { useAppDispatch } from '@/shared/config';

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation('errors');

  return useMutation<LoginResponse, ApiError, LoginParams>({
    mutationFn: login,

    onSuccess: (data) => {
      const role = data.roles[0];

      if (role && role === 'admin') {
        dispatch(
          setCredentials({
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            roles: data.roles,
            user: { email: data.email, name: data.name },
          }),
        );

        navigate('/dashboard', { replace: true });
      } else {
        toast.error(t('login.error'), {
          description: t('login.onlyAdmin'),
        });
      }
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
