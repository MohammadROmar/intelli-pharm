import type { ChatAction, ChatState } from './chatTypes';

export const INITIAL_CHAT_STATE: ChatState = {
  messages: [],
  isConversationLoading: false,
  conversation_id: null,
};

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SEND':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case 'RECEIVE':
      return {
        ...state,
        conversation_id: action.payload.conversation_id,
        messages: [...state.messages, action.payload],
      };

    case 'SEND_ERROR':
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.payload.clientMessageId,
        ),
      };

    case 'LOAD_START':
      return {
        ...state,
        messages: [],
        conversation_id: action.payload.conversationId,
        isConversationLoading: true,
      };

    case 'LOAD_SUCCESS':
      return {
        ...state,
        messages: action.payload.messages,
        conversation_id: action.payload.conversationId,
        isConversationLoading: false,
      };

    case 'LOAD_ERROR':
      return action.payload.conversationId === state.conversation_id
        ? { ...state, isConversationLoading: false }
        : state;

    case 'CLEAR':
      return INITIAL_CHAT_STATE;

    default:
      return state;
  }
}
