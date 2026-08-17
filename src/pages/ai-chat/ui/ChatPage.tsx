import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { SidebarInset, SidebarTrigger } from '@/widgets/sidebar';

import { ChatHistorySidebar } from './ChatHistorySidebar';
import type { ChatInputHandle } from './ChatInput';
import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';
import { useChat } from '../model/useChat';
import { useConversations } from '../model/useConversations';
import type { Conversation } from '../model/chatTypes';

const EMPTY_CONVERSATIONS: Conversation[] = [];

export default function ChatPage() {
  const { t } = useTranslation('chat');
  const inputRef = useRef<ChatInputHandle>(null);

  const restoreFailedMessage = useCallback((message: string) => {
    inputRef.current?.restoreMessage(message);
  }, []);

  const {
    messages,
    conversationId,
    isLoading,
    isConversationLoading,
    send,
    clear,
    loadConversation,
  } = useChat({ onMessageFailed: restoreFailedMessage });

  const {
    data,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
    isFetching: isHistoryFetching,
    refetch: refetchHistory,
  } = useConversations();
  const conversations = data ?? EMPTY_CONVERSATIONS;

  const pageTitle = `${t('pageTitle')} - IntelliPharma`;

  const handleRetryHistory = useCallback(() => {
    void refetchHistory();
  }, [refetchHistory]);

  const handleSelectConversation = useCallback(
    (selectedConversationId: number) => {
      void loadConversation(selectedConversationId);
    },
    [loadConversation],
  );

  return (
    <>
      <title>{pageTitle}</title>

      <ChatHistorySidebar
        conversations={conversations}
        activeConversationId={conversationId}
        isLoading={isHistoryLoading}
        isError={isHistoryError}
        isRetrying={isHistoryError && isHistoryFetching}
        isChatBusy={isLoading}
        onRetry={handleRetryHistory}
        onNewChat={clear}
        onSelectConversation={handleSelectConversation}
      />

      <SidebarInset className="relative min-h-0">
        <SidebarTrigger
          srLabel={t('toggleHistory')}
          className="bg-background/85 absolute start-3 top-2.5 z-20 size-11 touch-manipulation rounded-xl shadow-sm backdrop-blur-md md:size-10 md:rounded-lg"
        />

        <section
          aria-label={t('conversation')}
          className="relative grid h-full min-h-0 grid-rows-[1fr_auto] overflow-hidden"
        >
          <div
            data-chat-scroll-container
            className="thin-scrollbar flex h-full min-h-0 w-full flex-col overflow-y-auto overscroll-contain"
          >
            <ChatMessageList
              messages={messages}
              isLoading={isLoading}
              isConversationLoading={isConversationLoading}
            />
          </div>

          <ChatInput ref={inputRef} onSend={send} isLoading={isLoading} />
        </section>
      </SidebarInset>
    </>
  );
}
