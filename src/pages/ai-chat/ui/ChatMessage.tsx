import { useTranslation } from 'react-i18next';
import { Bot, User } from 'lucide-react';

import type { ChatMessage as TChatMessage } from '../model/chatTypes';
import { cn, formatTime12h } from '@/shared/lib';

type Props = { message: TChatMessage };

export function ChatMessage({ message }: Props) {
  const { i18n } = useTranslation();

  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex items-end gap-2.5',
        isUser ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <div
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground',
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>

      <div
        className={cn(
          'flex max-w-[75%] flex-col gap-1',
          isUser ? 'items-end' : 'items-start',
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-break-spaces',
            isUser
              ? 'bg-primary text-primary-foreground ltr:rounded-br-sm rtl:rounded-bl-sm'
              : 'bg-muted text-foreground ltr:rounded-bl-sm rtl:rounded-br-sm',
          )}
        >
          {message.message}
        </div>
        <span className="text-muted-foreground px-1 text-[10px]">
          {formatTime12h(message.created_at, i18n.language)}
        </span>
      </div>
    </div>
  );
}
