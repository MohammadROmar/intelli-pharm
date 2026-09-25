import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, MoreVertical, RefreshCw, Trash2 } from 'lucide-react';

import { cn } from '@/shared/lib';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
} from '@/shared/ui';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebarState,
} from '@/widgets/sidebar';

import { DeleteConversationModal } from './Deleteconversationmodal';
import type { ConversationGroup } from '../model/chatHistory';
import type { Conversation } from '../model/chatTypes';
import type { HistoryContentProps } from '../model/chatHistoryTypes';

const HISTORY_SKELETON_ITEMS = [0, 1, 2, 3, 4, 5] as const;

export function HistorySkeleton() {
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

  if (state === 'collapsed') return null;

  return (
    <div
      role="alert"
      className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center"
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

  if (state === 'collapsed') return null;

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
  onDelete: (conversation: Conversation) => void;
};

function HistoryConversationButton({
  conversation,
  isActive,
  isChatBusy,
  onSelectConversation,
  onDelete,
}: {
  conversation: Conversation;
  isActive: boolean;
  isChatBusy: boolean;
  onSelectConversation: (conversationId: number) => void;
  onDelete: (conversation: Conversation) => void;
}) {
  const { t } = useTranslation('chat');
  const title = conversation.title?.trim() || t('untitledConversation');

  return (
    <SidebarMenuItem className="[contain-intrinsic-size:auto_36px] [content-visibility:auto]">
      <SidebarMenuButton
        isActive={isActive}
        disabled={isChatBusy}
        aria-current={isActive ? 'page' : undefined}
        onClick={() => onSelectConversation(conversation.id)}
      >
        <span className="truncate">{title}</span>
      </SidebarMenuButton>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction
            showOnHover
            disabled={isChatBusy}
            className="peer-data-[active=true]/menu-button:opacity-100"
          >
            <MoreVertical aria-hidden />
            <span className="sr-only">
              {t('conversationOptions', { title })}
            </span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => onDelete(conversation)}
          >
            <Trash2 aria-hidden />
            {t('deleteConversation')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
  onDelete,
}: HistoryListProps) {
  const { state } = useSidebarState();

  if (state === 'collapsed') return null;

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
                onDelete={onDelete}
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
  onConversationDeleted,
}: HistoryContentProps) {
  const [conversationToDelete, setConversationToDelete] =
    useState<Conversation | null>(null);

  const hasBlockingError = isError && conversations.length === 0;
  const isEmpty = !isLoading && !hasBlockingError && conversations.length === 0;
  const hasNoResults =
    !isLoading &&
    !hasBlockingError &&
    conversations.length > 0 &&
    groups.length === 0;

  const handleDeleteModalClose = () => setConversationToDelete(null);

  const handleConversationDeleted = (conversationId: number) => {
    onConversationDeleted(conversationId);
  };

  let content: React.ReactNode;

  if (isLoading) {
    content = <HistorySkeleton />;
  } else if (hasBlockingError) {
    content = <HistoryError isRetrying={isRetrying} onRetry={onRetry} />;
  } else if (isEmpty || hasNoResults) {
    content = <HistoryEmptyState hasNoResults={hasNoResults} />;
  } else {
    content = (
      <HistoryList
        groups={groups}
        activeConversationId={activeConversationId}
        isChatBusy={isChatBusy}
        isSearchPending={isSearchPending}
        isRetrying={isRetrying}
        onSelectConversation={onSelectConversation}
        onDelete={setConversationToDelete}
      />
    );
  }

  return (
    <>
      {content}

      <DeleteConversationModal
        conversation={conversationToDelete}
        onClose={handleDeleteModalClose}
        onDeleted={handleConversationDeleted}
      />
    </>
  );
});
