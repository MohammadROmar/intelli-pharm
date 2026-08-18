import type { ConversationGroup } from './chatHistory';
import type { Conversation } from './chatTypes';

export type ChatHistorySidebarProps = {
  conversations: Conversation[];
  activeConversationId: number | null;
  isLoading: boolean;
  isError: boolean;
  isRetrying: boolean;
  isChatBusy: boolean;
  onRetry: () => void;
  onNewChat: () => void;
  onSelectConversation: (conversationId: number) => void;
  onConversationDeleted: (conversationId: number) => void;
};

export type HistoryContentProps = Omit<ChatHistorySidebarProps, 'onNewChat'> & {
  groups: ConversationGroup[];
  isSearchPending: boolean;
};
