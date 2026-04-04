import type { ChatAction, ChatState } from './chatTypes';

export const INITIAL_CHAT_STATE: ChatState = {
  messages: [],
  isLoading: false,
  conversation_id: null,
  error: null,
};

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SEND':
      return {
        ...state,
        isLoading: true,
        error: null,
        messages: [
          ...state.messages,
          {
            id: crypto.randomUUID(),
            role: 'user',
            message: action.payload,
            created_at: new Date().toString(),
            conversation_id: state.conversation_id,
          },
        ],
      };

    case 'RECEIVE':
      return {
        ...state,
        isLoading: false,
        conversation_id: action.payload.conversation_id,
        messages: [
          ...state.messages,
          {
            ...action.payload,
          },
        ],
      };

    case 'ERROR':
      return { ...state, isLoading: false, error: action.payload };

    case 'CLEAR':
      return INITIAL_CHAT_STATE;

    default:
      return state;
  }
}
