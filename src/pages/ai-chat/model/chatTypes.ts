export type MessageRole = 'user' | 'model';

export type ChatMessage = {
  id: string;
  role: MessageRole;
  message: string;
  conversation_id: number | null;
  created_at: string;
};

export type MessagePayload = {
  message: string;
  conversationId: number | null;
};

export type ChatState = {
  messages: ChatMessage[];
  isLoading: boolean;
  conversation_id: number | null;
  error: string | null;
};

export type ChatAction =
  | { type: 'SEND'; payload: string }
  | { type: 'RECEIVE'; payload: ChatMessage }
  | { type: 'ERROR'; payload: string }
  | { type: 'CLEAR' };
