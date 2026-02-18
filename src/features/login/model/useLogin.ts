import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { setCredentials } from '@/entities/session';
import { apiClient } from '@/shared/api';
import { useAppDispatch } from '@/shared/config';

interface LoginParams {
  email: string;
  password: string;
}

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginParams) => {
      const { data } = await apiClient.post('/api/users/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      dispatch(
        setCredentials({
          accessToken: data.accessToken,
          user: data.user,
        }),
      );

      navigate('/dashboard', { replace: true });
    },
  });
};
