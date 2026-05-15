import { useEffect, useRef } from 'react';
import { Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { BotIcon } from './BotIcon';
import { ChatMessage } from './ChatMessage';
import type { ChatMessage as TChatMessage } from '../model/chatTypes';

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5">
      <div className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full">
        <Bot className="size-4" />
      </div>
      <div className="bg-muted rounded-2xl px-4 py-3.5 ltr:rounded-bl-sm rtl:rounded-br-sm">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="bg-muted-foreground/60 size-1.5 animate-bounce rounded-full"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  const { t } = useTranslation('chat');

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
      <div className="bg-muted text-muted-foreground flex size-36 items-center justify-center rounded-2xl">
        <BotIcon size="6rem" />
      </div>
      <div>
        <p className="text-foreground font-semibold">{t('emptyTitle')}</p>
        <p className="text-muted-foreground mt-1 text-sm">
          {t('emptySubtitle')}
        </p>
      </div>
    </div>
  );
}

type Props = {
  messages: TChatMessage[];
  isLoading: boolean;
  error: string | null;
};

export function ChatMessageList({ messages, isLoading, error }: Props) {
  const { t } = useTranslation();
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isLoading]);

  if (!hasMessages) return <EmptyState />;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className={'flex flex-col gap-4 px-4 py-6'}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <p className="text-destructive text-center text-xs">{t(error)}</p>
        )}

        <div ref={bottomRef} aria-hidden />
      </div>
    </div>
  );
}
