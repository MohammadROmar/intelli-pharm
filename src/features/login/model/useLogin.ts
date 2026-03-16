import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import type { LoginParams, LoginResponse } from './loginTypes';
import { login } from '../api/api';
import { setCredentials } from '@/entities/session';
import type { ApiResponse, ApiError } from '@/shared/api';
import { useAppDispatch } from '@/shared/config';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation<ApiResponse<LoginResponse>, ApiError, LoginParams>({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(
        setCredentials({
          accessToken: data.data!.access_token,
          refreshToken: data.data!.refresh_token,
          user: { email: '', name: '' },
        }),
      );

      navigate('/dashboard', { replace: true });
    },
  });
};
