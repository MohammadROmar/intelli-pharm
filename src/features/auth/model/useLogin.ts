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
import type { LoginParams, LoginResponse } from './loginTypes';

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation('errors');

  return useMutation<LoginResponse, ApiError, LoginParams>({
    mutationFn: login,

    onSuccess: (data) => {
      dispatch(setCredentials(toSessionCredentials(data)));
      broadcastRefreshed(data);
      navigate('/dashboard', { replace: true });
    },

    onError: (error) => {
      toast.error(t('login.error'), {
        description: t(getLoginErrorKey(error)),
      });
    },
  });
}
