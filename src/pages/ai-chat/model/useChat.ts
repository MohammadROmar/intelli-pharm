import { useCallback, useEffect, useReducer, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { chatReducer, INITIAL_CHAT_STATE } from './chatReducer';
import { getConversationMessages } from './chatApi';
import { chatQueryKeys } from './chatQueryKeys';
import { useChatNotifications } from './useChatNotifications';
import { useSendMessage } from './useSendMessage';

type UseChatOptions = {
  onMessageFailed: (message: string) => void;
};

export function useChat({ onMessageFailed }: UseChatOptions) {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(chatReducer, INITIAL_CHAT_STATE);
  const latestLoadRef = useRef(0);
  const activeConversationRequestRef = useRef<number | null>(null);
  const { showConversationError, showSendError } = useChatNotifications();

  const { mutate, isPending } = useSendMessage();

  useEffect(() => {
    return () => {
      latestLoadRef.current += 1;

      const activeConversationId = activeConversationRequestRef.current;
      if (activeConversationId === null) return;

      void queryClient.cancelQueries({
        queryKey: chatQueryKeys.detail(activeConversationId),
      });
    };
  }, [queryClient]);

  const send = useCallback(
    (message: string) => {
      const trimmedMessage = message.trim();
      if (!trimmedMessage || isPending || state.isConversationLoading) return;

      const clientMessageId = `client-${crypto.randomUUID()}`;

      dispatch({
        type: 'SEND',
        payload: {
          id: clientMessageId,
          role: 'user',
          message: trimmedMessage,
          created_at: new Date().toISOString(),
          conversation_id: state.conversation_id,
        },
      });

      mutate(
        {
          message: trimmedMessage,
          conversationId: state.conversation_id,
        },
        {
          onSuccess: (data) => {
            dispatch({ type: 'RECEIVE', payload: data });

            void queryClient.invalidateQueries({
              queryKey: chatQueryKeys.list(undefined),
            });

            if (data.conversation_id !== null) {
              void queryClient.invalidateQueries({
                queryKey: chatQueryKeys.detail(data.conversation_id),
                refetchType: 'none',
              });
            }
          },
          onError: (error) => {
            dispatch({
              type: 'SEND_ERROR',
              payload: { clientMessageId },
            });
            onMessageFailed(trimmedMessage);
            showSendError(error);
          },
        },
      );
    },
    [
      isPending,
      mutate,
      onMessageFailed,
      queryClient,
      showSendError,
      state.conversation_id,
      state.isConversationLoading,
    ],
  );

  const loadConversation = useCallback(
    async (conversationId: number) => {
      const loadId = latestLoadRef.current + 1;
      latestLoadRef.current = loadId;

      const previousConversationId = activeConversationRequestRef.current;
      if (
        previousConversationId !== null &&
        previousConversationId !== conversationId
      ) {
        void queryClient.cancelQueries({
          queryKey: chatQueryKeys.detail(previousConversationId),
        });
      }

      activeConversationRequestRef.current = conversationId;

      dispatch({ type: 'LOAD_START', payload: { conversationId } });

      try {
        const messages = await queryClient.fetchQuery({
          queryKey: chatQueryKeys.detail(conversationId),
          queryFn: ({ signal }) =>
            getConversationMessages(conversationId, signal),
          staleTime: 30_000,
        });

        if (loadId !== latestLoadRef.current) return;

        dispatch({
          type: 'LOAD_SUCCESS',
          payload: { conversationId, messages },
        });
      } catch {
        if (loadId !== latestLoadRef.current) return;

        dispatch({ type: 'LOAD_ERROR', payload: { conversationId } });
        showConversationError();
      } finally {
        if (loadId === latestLoadRef.current) {
          activeConversationRequestRef.current = null;
        }
      }
    },
    [queryClient, showConversationError],
  );

  const clear = useCallback(() => {
    latestLoadRef.current += 1;

    const activeConversationId = activeConversationRequestRef.current;
    activeConversationRequestRef.current = null;

    if (activeConversationId !== null) {
      void queryClient.cancelQueries({
        queryKey: chatQueryKeys.detail(activeConversationId),
      });
    }

    dispatch({ type: 'CLEAR' });
  }, [queryClient]);

  return {
    messages: state.messages,
    conversationId: state.conversation_id,
    isLoading: isPending || state.isConversationLoading,
    isConversationLoading: state.isConversationLoading,
    send,
    clear,
    loadConversation,
  };
}
