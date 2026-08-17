export type MessageRole = 'user' | 'model';

export type ChatMessage = {
  id: number | string;
  role: MessageRole;
  message: string;
  conversation_id: number | null;
  created_at: string;
  updated_at?: string;
  message_type?: 'text' | string;
};

export type MessagePayload = {
  message: string;
  conversationId: number | null;
};

export type Conversation = {
  id: number;
  title: string | null;
  created_at: string;
  updated_at: string;
};

export type ChatState = {
  messages: ChatMessage[];
  isConversationLoading: boolean;
  conversation_id: number | null;
};

export type ChatAction =
  | { type: 'SEND'; payload: ChatMessage }
  | { type: 'RECEIVE'; payload: ChatMessage }
  | { type: 'SEND_ERROR'; payload: { clientMessageId: string } }
  | { type: 'LOAD_START'; payload: { conversationId: number } }
  | {
      type: 'LOAD_SUCCESS';
      payload: { conversationId: number; messages: ChatMessage[] };
    }
  | { type: 'LOAD_ERROR'; payload: { conversationId: number } }
  | { type: 'CLEAR' };
