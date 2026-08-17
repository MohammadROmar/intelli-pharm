import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, RefreshCw } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebarState,
} from '@/widgets/sidebar';
import { cn } from '@/shared/lib';
import { Button, Skeleton } from '@/shared/ui';

import type { ConversationGroup } from '../model/chatHistory';
import type { Conversation } from '../model/chatTypes';
import type { HistoryContentProps } from '../model/chatHistoryTypes';

const HISTORY_SKELETON_ITEMS = [0, 1, 2, 3, 4, 5] as const;

function HistorySkeleton() {
  const { t } = useTranslation('chat');
  const { state } = useSidebarState();
  const isCollapsed = state === 'collapsed';

  return (
    <div
      role="status"
      aria-label={t('loadingHistory')}
      className="space-y-1 px-2 py-2"
      aria-hidden
    >
      {HISTORY_SKELETON_ITEMS.map((item) => (
        <div
          key={item}
          className={cn(
            'flex h-9 items-center gap-2 rounded-lg px-2',
            isCollapsed && 'justify-center px-0',
          )}
        >
          <Skeleton className="size-4 shrink-0 rounded-md!" />
          {isCollapsed ? null : (
            <Skeleton
              className={cn('h-3.5 flex-1', item % 3 === 1 && 'max-w-3/5')}
            />
          )}
        </div>
      ))}
    </div>
  );
}

type HistoryErrorProps = {
  isRetrying: boolean;
  onRetry: () => void;
};

function HistoryError({ isRetrying, onRetry }: HistoryErrorProps) {
  const { t } = useTranslation('chat');
  const { state } = useSidebarState();
  const retryIcon = (
    <RefreshCw
      className={cn(
        'size-4',
        isRetrying && 'animate-spin motion-reduce:animate-none',
      )}
      aria-hidden
    />
  );

  if (state === 'collapsed') {
    return (
      <div role="alert" className="flex justify-center px-2 py-2">
        <span className="sr-only">{t('historyErrorTitle')}</span>
        <SidebarMenuButton
          onClick={onRetry}
          disabled={isRetrying}
          tooltip={isRetrying ? t('retrying') : t('retry')}
        >
          {retryIcon}
        </SidebarMenuButton>
      </div>
    );
  }

  return (
    <div
      role="alert"
      className="flex min-h-48 flex-col items-center justify-center gap-3 px-4 text-center"
    >
      <div className="bg-sidebar-accent flex size-10 items-center justify-center rounded-xl">
        {retryIcon}
      </div>
      <div>
        <p className="text-sm font-medium">{t('historyErrorTitle')}</p>
        <p className="text-sidebar-foreground/65 mt-1 text-xs leading-5">
          {t('historyErrorDescription')}
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onRetry}
        disabled={isRetrying}
        className="min-h-10"
      >
        {retryIcon}
        {isRetrying ? t('retrying') : t('retry')}
      </Button>
    </div>
  );
}

type HistoryEmptyStateProps = {
  hasNoResults: boolean;
};

function HistoryEmptyState({ hasNoResults }: HistoryEmptyStateProps) {
  const { t } = useTranslation('chat');
  const { state } = useSidebarState();
  const title = hasNoResults ? t('noHistoryResults') : t('emptyHistoryTitle');

  if (state === 'collapsed') {
    return (
      <div className="flex justify-center px-2 py-2">
        <span
          className="text-sidebar-foreground/50 flex size-8 items-center justify-center"
          title={title}
        >
          <MessageSquare className="size-4" aria-hidden />
        </span>
      </div>
    );
  }

  return (
    <div
      role="status"
      className="flex h-full min-h-56 flex-col items-center justify-center px-5 text-center"
    >
      <div className="bg-sidebar-accent flex size-10 items-center justify-center rounded-xl">
        <MessageSquare
          className="text-sidebar-foreground/70 size-4"
          aria-hidden
        />
      </div>
      <p className="mt-3 text-sm font-medium">{title}</p>
      <p className="text-sidebar-foreground/65 mt-1 text-xs leading-5">
        {hasNoResults
          ? t('noHistoryResultsDescription')
          : t('emptyHistoryDescription')}
      </p>
    </div>
  );
}

type HistoryListProps = {
  groups: ConversationGroup[];
  activeConversationId: number | null;
  isChatBusy: boolean;
  isSearchPending: boolean;
  isRetrying: boolean;
  onSelectConversation: (conversationId: number) => void;
};

function HistoryConversationButton({
  conversation,
  isActive,
  isChatBusy,
  onSelectConversation,
}: {
  conversation: Conversation;
  isActive: boolean;
  isChatBusy: boolean;
  onSelectConversation: (conversationId: number) => void;
}) {
  const { t } = useTranslation('chat');
  const title = conversation.title?.trim() || t('untitledConversation');

  return (
    <SidebarMenuItem className="[contain-intrinsic-size:auto_36px] [content-visibility:auto]">
      <SidebarMenuButton
        isActive={isActive}
        disabled={isChatBusy}
        tooltip={title}
        aria-current={isActive ? 'page' : undefined}
        onClick={() => onSelectConversation(conversation.id)}
      >
        <span className="truncate">{title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function HistoryList({
  groups,
  activeConversationId,
  isChatBusy,
  isSearchPending,
  isRetrying,
  onSelectConversation,
}: HistoryListProps) {
  return (
    <>
      {groups.map((group) => (
        <SidebarGroup key={group.key}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu aria-busy={isRetrying || isSearchPending}>
            {group.conversations.map((conversation) => (
              <HistoryConversationButton
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === activeConversationId}
                isChatBusy={isChatBusy}
                onSelectConversation={onSelectConversation}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}

export const ChatHistoryContent = memo(function ChatHistoryContent({
  conversations,
  groups,
  activeConversationId,
  isLoading,
  isError,
  isRetrying,
  isSearchPending,
  isChatBusy,
  onRetry,
  onSelectConversation,
}: HistoryContentProps) {
  const hasBlockingError = isError && conversations.length === 0;
  const isEmpty = !isLoading && !hasBlockingError && conversations.length === 0;
  const hasNoResults =
    !isLoading &&
    !hasBlockingError &&
    conversations.length > 0 &&
    groups.length === 0;

  if (isLoading) return <HistorySkeleton />;

  if (hasBlockingError) {
    return <HistoryError isRetrying={isRetrying} onRetry={onRetry} />;
  }

  if (isEmpty || hasNoResults) {
    return <HistoryEmptyState hasNoResults={hasNoResults} />;
  }

  return (
    <HistoryList
      groups={groups}
      activeConversationId={activeConversationId}
      isChatBusy={isChatBusy}
      isSearchPending={isSearchPending}
      isRetrying={isRetrying}
      onSelectConversation={onSelectConversation}
    />
  );
});
