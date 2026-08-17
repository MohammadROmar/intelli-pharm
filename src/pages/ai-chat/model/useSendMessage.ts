import { useMutation } from '@tanstack/react-query';
import { ApiError } from '@/shared/api';

import { sendMessage } from './chatApi';
import { chatQueryKeys } from './chatQueryKeys';
import type { ChatMessage, MessagePayload } from './chatTypes';

export function useSendMessage() {
  return useMutation<ChatMessage, ApiError, MessagePayload>({
    mutationKey: chatQueryKeys.all,
    mutationFn: sendMessage,
  });
}
