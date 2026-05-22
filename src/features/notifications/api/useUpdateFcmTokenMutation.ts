import { useMutation } from '@tanstack/react-query';

import { updateFcmToken } from './updateFcmToken';

export function useUpdateFcmTokenMutation() {
  return useMutation({
    mutationFn: updateFcmToken,
    retry: 2,
  });
}
