import { useState, useCallback } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUp } from 'lucide-react';

import { Button, Textarea } from '@/shared/ui';

type ChatInputProps = {
  onSend: (question: string) => void;
  isLoading: boolean;
};

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });
  const [value, setValue] = useState('');

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;

    onSend(trimmed);
    setValue('');
  }, [value, isLoading, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <div className="border-border bg-background/80 supports-backdrop-filter:bg-background/60 border-t backdrop-blur">
      <div className="mx-auto max-w-3xl p-4">
        <div className="border-input bg-muted/50 focus-within:border-ring focus-within:ring-ring/50 group relative flex w-full items-end gap-2 rounded-3xl border p-2 shadow-sm transition-all duration-200 focus-within:ring-2">
          <Textarea
            value={value}
            autoFocus
            autoCorrect="off"
            autoComplete="off"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-label={t('inputPlaceholder')}
            aria-multiline
            placeholder={t('inputPlaceholder')}
            disabled={isLoading}
            rows={2}
            className="thin-scrollbar max-h-52! min-h-11! resize-none rounded-xl! border-0 bg-transparent px-4 py-2.5 text-sm shadow-none focus:ring-0! focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
          />

          <Button
            size="icon"
            onClick={handleSend}
            disabled={!value.trim() || isLoading}
            aria-label={t('sendButton')}
            className="mr-1 mb-1 size-9 shrink-0 rounded-full! transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
          >
            <ArrowUp className="size-4" />
          </Button>
        </div>

        <p className="text-muted-foreground/80 mt-3 text-center text-xs">
          {t('inputHint')}
        </p>
      </div>
    </div>
  );
}
