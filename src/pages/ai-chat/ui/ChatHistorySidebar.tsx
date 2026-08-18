import { useCallback, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@radix-ui/react-direction';
import { ArrowLeft, Search, SquarePen, X } from 'lucide-react';

import { cn } from '@/shared/lib';
import { Input } from '@/shared/ui';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuLink,
  SidebarRail,
  useSidebarMobile,
  useSidebarState,
} from '@/widgets/sidebar';

import { ChatHistoryContent } from './ChatHistoryContent';
import { ChatSidebarBrand } from './ChatSidebarBrand';
import { useChatHistorySearch } from '../model/useChatHistorySearch';
import type { ChatHistorySidebarProps } from '../model/chatHistoryTypes';

type ChatHistorySearchFieldProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

function ChatHistorySearchField({
  search,
  onSearchChange,
}: ChatHistorySearchFieldProps) {
  const { t } = useTranslation('chat');
  const { state } = useSidebarState();
  const isCollapsed = state === 'collapsed';
  const searchId = useId();

  return (
    <div
      className={cn(
        'relative px-1 pt-1 transition-[margin,opacity] duration-200 ease-linear motion-reduce:transition-none',
        'group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:-mt-10 group-data-[collapsible=icon]:opacity-0',
      )}
      aria-hidden={isCollapsed}
    >
      <label htmlFor={searchId} className="sr-only">
        {t('searchHistory')}
      </label>
      <Input
        id={searchId}
        name="chat-history-search"
        type="search"
        value={search}
        autoComplete="off"
        icon={Search}
        disabled={isCollapsed}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={t('searchHistory')}
        className="bg-sidebar-accent/40 border-sidebar-border h-10 pe-9! shadow-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
      />

      {search ? (
        <button
          type="button"
          onClick={() => onSearchChange('')}
          tabIndex={isCollapsed ? -1 : undefined}
          className="text-sidebar-foreground/60 hover:text-sidebar-foreground focus-visible:ring-sidebar-ring absolute end-2 top-1/2 flex size-7 -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center rounded-md transition-colors duration-200 outline-none focus-visible:ring-2 motion-reduce:transition-none"
          aria-label={t('clearSearch')}
          title={t('clearSearch')}
        >
          <X className="size-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

function ChatHistorySidebarBody({
  conversations,
  activeConversationId,
  isLoading,
  isError,
  isRetrying,
  isChatBusy,
  onRetry,
  onNewChat,
  onSelectConversation,
  onConversationDeleted,
}: ChatHistorySidebarProps) {
  const { t } = useTranslation('chat');
  const { setOpenMobile } = useSidebarMobile();
  const { search, setSearch, isSearchPending, groups } = useChatHistorySearch({
    conversations,
  });

  const handleNewChat = useCallback(() => {
    onNewChat();
    setOpenMobile(false);
  }, [onNewChat, setOpenMobile]);

  const handleSelectConversation = useCallback(
    (conversationId: number) => {
      if (conversationId !== activeConversationId) {
        onSelectConversation(conversationId);
      }
      setOpenMobile(false);
    },
    [activeConversationId, onSelectConversation, setOpenMobile],
  );

  return (
    <>
      <SidebarHeader>
        <ChatSidebarBrand />

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleNewChat}
              disabled={isChatBusy}
              tooltip={t('newConversation')}
            >
              <SquarePen className="size-4" aria-hidden />
              <span className="truncate">{t('newConversation')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <ChatHistorySearchField search={search} onSearchChange={setSearch} />
      </SidebarHeader>

      <SidebarContent className="thin-scrollbar">
        <ChatHistoryContent
          conversations={conversations}
          groups={groups}
          activeConversationId={activeConversationId}
          isLoading={isLoading}
          isError={isError}
          isRetrying={isRetrying}
          isSearchPending={isSearchPending}
          isChatBusy={isChatBusy}
          onRetry={onRetry}
          onSelectConversation={handleSelectConversation}
          onConversationDeleted={onConversationDeleted}
        />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuLink to="/dashboard" label={t('backToDashboard')}>
              <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
              <span className="truncate">{t('backToDashboard')}</span>
            </SidebarMenuLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

export function ChatHistorySidebar(props: ChatHistorySidebarProps) {
  const dir = useDirection();

  return (
    <Sidebar side={dir === 'ltr' ? 'left' : 'right'} collapsible="icon">
      <ChatHistorySidebarBody {...props} />
      <SidebarRail />
    </Sidebar>
  );
}
