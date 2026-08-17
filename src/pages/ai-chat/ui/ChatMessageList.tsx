import { useEffect, useRef } from 'react';
import { Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { BotIcon } from './BotIcon';
import { ChatMessage } from './ChatMessage';
import { ChatMessageSkeleton } from './ChatMessageSkeleton';
import type { ChatMessage as TChatMessage } from '../model/chatTypes';

const CONVERSATION_SKELETON_ROLES = ['user', 'model', 'user'] as const;

function TypingIndicator() {
  const { t } = useTranslation('chat');

  return (
    <div
      className="flex items-end gap-2.5"
      role="status"
      aria-label={t('assistantThinking')}
    >
      <div className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full">
        <Bot className="size-4" aria-hidden />
      </div>
      <div className="bg-muted rounded-2xl px-4 py-3.5 ltr:rounded-bl-sm rtl:rounded-br-sm">
        <div className="flex items-center gap-1">
          <span className="bg-muted-foreground/60 size-1.5 animate-bounce rounded-full motion-reduce:animate-none" />
          <span className="bg-muted-foreground/60 size-1.5 animate-bounce rounded-full [animation-delay:150ms] motion-reduce:animate-none" />
          <span className="bg-muted-foreground/60 size-1.5 animate-bounce rounded-full [animation-delay:300ms] motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  const { t } = useTranslation('chat');

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <div className="bg-muted text-muted-foreground flex size-36 items-center justify-center rounded-2xl">
        <BotIcon size="6rem" />
      </div>
      <div className="mt-5">
        <h2 className="text-foreground text-xl font-semibold tracking-tight text-balance sm:text-2xl">
          {t('emptyTitle')}
        </h2>
        <p className="text-muted-foreground mx-auto mt-2 max-w-sm text-sm leading-6">
          {t('emptySubtitle')}
        </p>
      </div>
    </div>
  );
}

function ConversationMessagesSkeleton() {
  const { t } = useTranslation('chat');

  return (
    <div
      className="mx-auto w-full max-w-3xl space-y-7 px-4 pt-16 pb-8 md:py-8"
      role="status"
      aria-label={t('loadingConversation')}
    >
      {CONVERSATION_SKELETON_ROLES.map((role, index) => (
        <ChatMessageSkeleton key={`${role}-${index}`} role={role} />
      ))}
    </div>
  );
}

type Props = {
  messages: TChatMessage[];
  isLoading: boolean;
  isConversationLoading: boolean;
};

export function ChatMessageList({
  messages,
  isLoading,
  isConversationLoading,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const previousMessageCountRef = useRef(0);
  const isNearBottomRef = useRef(true);
  const hasMessages = messages.length > 0;
  const lastMessageRole = hasMessages
    ? messages[messages.length - 1].role
    : null;

  useEffect(() => {
    if (!hasMessages || isConversationLoading) {
      isNearBottomRef.current = true;
      return;
    }

    const sentinel = bottomRef.current;
    if (!sentinel || !('IntersectionObserver' in window)) return;

    const scrollContainer = sentinel.closest<HTMLElement>(
      '[data-chat-scroll-container]',
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry) isNearBottomRef.current = entry.isIntersecting;
      },
      {
        root: scrollContainer,
        rootMargin: '0px 0px 160px 0px',
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMessages, isConversationLoading]);

  useEffect(() => {
    if (isConversationLoading) {
      previousMessageCountRef.current = 0;
      isNearBottomRef.current = true;
      return;
    }

    if (messages.length === 0) {
      previousMessageCountRef.current = 0;
      isNearBottomRef.current = true;
      return;
    }

    const loadedSeveralMessages =
      messages.length - previousMessageCountRef.current > 1;
    const userJustSentMessage =
      messages.length > previousMessageCountRef.current &&
      lastMessageRole === 'user';
    const shouldScroll =
      loadedSeveralMessages || userJustSentMessage || isNearBottomRef.current;

    previousMessageCountRef.current = messages.length;
    if (!shouldScroll) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    bottomRef.current?.scrollIntoView({
      behavior:
        loadedSeveralMessages || userJustSentMessage || prefersReducedMotion
          ? 'auto'
          : 'smooth',
    });
  }, [isConversationLoading, isLoading, lastMessageRole, messages.length]);

  if (isConversationLoading) return <ConversationMessagesSkeleton />;

  if (!hasMessages) return <EmptyState />;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="flex flex-col gap-7 px-4 pt-16 pb-8 sm:px-6 md:py-8">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading ? <TypingIndicator /> : null}

        <div ref={bottomRef} aria-hidden />
      </div>
    </div>
  );
}
