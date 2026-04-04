import { useReducer, useCallback } from 'react';
import { chatReducer, INITIAL_CHAT_STATE } from './chatReducer';
import { useSendMessage } from './useSendMessage';

export function useChat() {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_CHAT_STATE);

  const { mutate, isPending, error: mutationError } = useSendMessage();

  const send = useCallback(
    (message: string) => {
      if (!message.trim()) return;

      dispatch({ type: 'SEND', payload: message });

      mutate(
        { message, conversationId: state.conversation_id },
        {
          onSuccess: (data) => {
            if (data && data.data)
              dispatch({ type: 'RECEIVE', payload: data.data });
          },
          onError: (error) => {
            dispatch({
              type: 'ERROR',
              payload: error.i18nKey ?? 'errors.unknown',
            });
          },
        },
      );
    },
    [mutate, state.conversation_id],
  );

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading || isPending,
    error: mutationError?.message || state.error,
    send,
    clear,
  };
}
