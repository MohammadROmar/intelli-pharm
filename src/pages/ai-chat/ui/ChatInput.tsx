import {
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { ChangeEvent, KeyboardEvent, Ref } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUp } from 'lucide-react';

import { Button, Textarea } from '@/shared/ui';

export type ChatInputHandle = {
  restoreMessage: (message: string) => void;
};

type ChatInputProps = {
  onSend: (question: string) => void;
  isLoading: boolean;
  ref?: Ref<ChatInputHandle>;
};

export function ChatInput({ onSend, isLoading, ref }: ChatInputProps) {
  const { t } = useTranslation('chat');
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const focusFrameRef = useRef<number | null>(null);
  const inputId = useId();
  const hintId = `${inputId}-hint`;

  const trimmedValue = value.trim();

  const trimmedValueRef = useRef(trimmedValue);

  useImperativeHandle(
    ref,
    () => ({
      restoreMessage(message: string) {
        setValue(message);
        trimmedValueRef.current = message.trim();

        if (focusFrameRef.current !== null) {
          cancelAnimationFrame(focusFrameRef.current);
        }

        focusFrameRef.current = requestAnimationFrame(() => {
          focusFrameRef.current = null;
          textareaRef.current?.focus();
        });
      },
    }),
    [],
  );

  useEffect(
    () => () => {
      if (focusFrameRef.current !== null) {
        cancelAnimationFrame(focusFrameRef.current);
      }
    },
    [],
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    setValue(next);
    trimmedValueRef.current = next.trim();
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = trimmedValueRef.current;
    if (!trimmed || isLoading) return;

    onSend(trimmed);
    setValue('');
    trimmedValueRef.current = '';
  }, [isLoading, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== 'Enter' || e.shiftKey || e.nativeEvent.isComposing) {
        return;
      }

      e.preventDefault();
      handleSend();
    },
    [handleSend],
  );

  return (
    <div className="bg-background/95 supports-backdrop-filter:bg-background/80 backdrop-blur-lg">
      <div className="mx-auto max-w-3xl px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4 sm:pt-4">
        <label htmlFor={inputId} className="sr-only">
          {t('inputLabel')}
        </label>
        <div className="border-input bg-card focus-within:border-ring focus-within:ring-ring/30 group relative flex w-full items-end gap-2 rounded-3xl border p-2 shadow-sm transition-[border-color,box-shadow] duration-200 focus-within:ring-2 motion-reduce:transition-none">
          <Textarea
            ref={textareaRef}
            id={inputId}
            name="message"
            value={value}
            autoCorrect="off"
            autoComplete="off"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-describedby={hintId}
            aria-multiline
            placeholder={t('inputPlaceholder')}
            disabled={isLoading}
            rows={1}
            className="thin-scrollbar max-h-52! min-h-11! resize-none rounded-xl! border-0 bg-transparent px-3 py-2.5 text-base shadow-none focus:ring-0! focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
          />

          <Button
            type="button"
            size="icon"
            onClick={handleSend}
            disabled={!trimmedValue || isLoading}
            aria-label={t('sendButton')}
            className="relative mb-0.5 size-10 shrink-0 touch-manipulation rounded-full! transition-opacity duration-200 after:absolute after:-inset-0.5 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none"
          >
            <ArrowUp className="size-4" aria-hidden />
          </Button>
        </div>

        <p
          id={hintId}
          className="text-muted-foreground mt-2 text-center text-xs"
        >
          {isLoading ? t('inputLoadingHint') : t('inputHint')}
        </p>
      </div>
    </div>
  );
}
