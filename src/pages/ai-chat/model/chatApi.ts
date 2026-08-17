import { apiClient, unwrapApiResponse } from '@/shared/api';

import {
  createEmptyAssistantResponseError,
  hasEmptyAssistantResponsePayload,
  normalizeSendMessageError,
} from './chatErrors';
import type { ChatMessage, Conversation, MessagePayload } from './chatTypes';

export async function sendMessage({
  message,
  conversationId,
}: MessagePayload): Promise<ChatMessage> {
  try {
    const response = await apiClient.post<ChatMessage>(
      '/llm/v1/gemini/messages',
      {
        message,
        role: 'user',
        conversation_id: conversationId,
      },
    );

    if (
      hasEmptyAssistantResponsePayload(response.statusCode, response.errors)
    ) {
      throw createEmptyAssistantResponseError(response.statusCode);
    }

    return unwrapApiResponse(response);
  } catch (error) {
    throw normalizeSendMessageError(error);
  }
}

export async function getConversations(
  signal?: AbortSignal,
): Promise<Conversation[]> {
  const response = await apiClient.get<Conversation[]>(
    '/llm/v1/conversations',
    { signal },
  );
  return unwrapApiResponse(response);
}

export async function getConversationMessages(
  conversationId: number,
  signal?: AbortSignal,
): Promise<ChatMessage[]> {
  const response = await apiClient.get<ChatMessage[]>(
    `/llm/v1/conversations/${conversationId}/messages`,
    { signal },
  );

  return unwrapApiResponse(response);
}
