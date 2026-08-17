import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bot, Check, Copy, User } from 'lucide-react';
import { toast } from 'sonner';

import { cn, formatTime12h } from '@/shared/lib';
import { Button } from '@/shared/ui';

import type { ChatMessage as TChatMessage } from '../model/chatTypes';

type Props = { message: TChatMessage };

export const ChatMessage = memo(function ChatMessage({ message }: Props) {
  const { i18n, t } = useTranslation('chat');
  const [isCopied, setIsCopied] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isUser = message.role === 'user';

  useEffect(
    () => () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    },
    [],
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message.message);
      setIsCopied(true);

      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => setIsCopied(false), 2_000);
    } catch {
      toast.error(t('copyError'));
    }
  }, [message.message, t]);

  return (
    <div
      className={cn(
        'group/message flex items-start gap-2.5 [contain-intrinsic-size:auto_96px] [content-visibility:auto]',
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
        {isUser ? (
          <User className="size-4" aria-hidden />
        ) : (
          <Bot className="size-4" aria-hidden />
        )}
      </div>

      <div
        className={cn(
          'flex max-w-[min(85%,42rem)] flex-col gap-1.5',
          isUser ? 'items-end' : 'items-start',
        )}
      >
        <div
          className={cn(
            'text-foreground rounded-2xl text-sm leading-7 wrap-break-word whitespace-break-spaces',
            isUser
              ? 'bg-primary text-primary-foreground px-4 py-2.5 ltr:rounded-tr-sm rtl:rounded-tl-sm'
              : 'px-1 py-1',
          )}
        >
          {message.message}
        </div>
        <div
          className={cn(
            'text-muted-foreground flex items-center gap-1 text-[10px]',
            isUser && 'flex-row-reverse',
          )}
        >
          <span>{formatTime12h(message.created_at, i18n.language)}</span>
          <Button
            type="button"
            variant="ghost"
            onClick={handleCopy}
            aria-label={isCopied ? t('copiedMessage') : t('copyMessage')}
            title={isCopied ? t('copiedMessage') : t('copyMessage')}
            className={cn(
              'relative mx-1 h-fit min-h-0 min-w-0 touch-manipulation p-0! opacity-100 transition-opacity duration-200 after:absolute after:-inset-1.5 hover:bg-transparent! motion-reduce:transition-none',
              '[@media(hover:hover)_and_(pointer:fine)]:opacity-0',
              '[@media(hover:hover)_and_(pointer:fine)]:group-hover/message:opacity-100',
              '[@media(hover:hover)_and_(pointer:fine)]:group-focus-within/message:opacity-100',
            )}
          >
            {isCopied ? (
              <Check className="size-3 shrink-0" aria-hidden />
            ) : (
              <Copy className="size-3 shrink-0" aria-hidden />
            )}
          </Button>
          <span className="sr-only" aria-live="polite">
            {isCopied ? t('copiedMessage') : ''}
          </span>
        </div>
      </div>
    </div>
  );
});
