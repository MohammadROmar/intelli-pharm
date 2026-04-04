import { useMutation } from '@tanstack/react-query';
import { apiClient, ApiError, type ApiResponse } from '@/shared/api';
import type { ChatMessage, MessagePayload } from './chatTypes';

function sendMessage({ message, conversationId }: MessagePayload) {
  return apiClient.post<ChatMessage>('/llm/v1/gemini/messages', {
    message,
    role: 'user',
    conversation_id: conversationId,
  });
}

export function useSendMessage() {
  return useMutation<ApiResponse<ChatMessage>, ApiError, MessagePayload>({
    mutationKey: ['ai-chat'],
    mutationFn: sendMessage,
  });
}
