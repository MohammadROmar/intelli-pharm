import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type KeyboardEvent,
  type ChangeEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUp } from 'lucide-react';
import { Button, Textarea } from '@/shared/ui';

type ChatInputProps = {
  onSend: (question: string) => void;
  isLoading: boolean;
};

const MAX_INPUT_HEIGHT = 200;
const MIN_INPUT_HEIGHT = 44;
const MIN_THUMB_HEIGHT = 20;

const TRACK_VERTICAL_INSET = 8;

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });
  const [value, setValue] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isScrollable, setIsScrollable] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(MIN_THUMB_HEIGHT);
  const [thumbTop, setThumbTop] = useState(0);

  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const scrollStartTopRef = useRef(0);

  const updateScrollbar = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { scrollTop, scrollHeight, clientHeight } = textarea;
    const canScroll = scrollHeight > clientHeight + 1;
    setIsScrollable(canScroll);

    if (!canScroll) {
      setThumbHeight(MIN_THUMB_HEIGHT);
      setThumbTop(0);
      return;
    }

    const trackHeight = Math.max(clientHeight - TRACK_VERTICAL_INSET * 2, 1);

    const nextThumbHeight = Math.max(
      (clientHeight / scrollHeight) * trackHeight,
      MIN_THUMB_HEIGHT,
    );

    const maxScrollTop = scrollHeight - clientHeight;
    const maxThumbTop = Math.max(trackHeight - nextThumbHeight, 0);

    const nextThumbTop =
      maxScrollTop > 0 ? (scrollTop / maxScrollTop) * maxThumbTop : 0;

    setThumbHeight(nextThumbHeight);
    setThumbTop(nextThumbTop);
  }, []);

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = `${MIN_INPUT_HEIGHT}px`;
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_INPUT_HEIGHT)}px`;
    updateScrollbar();
  }, [updateScrollbar]);

  const onDragging = useCallback(
    (e: MouseEvent) => {
      const textarea = textareaRef.current;
      if (!textarea || !isDraggingRef.current) return;

      const deltaY = e.clientY - dragStartYRef.current;

      const { scrollHeight, clientHeight } = textarea;
      const trackHeight = Math.max(clientHeight - TRACK_VERTICAL_INSET * 2, 1);

      const maxScrollTop = scrollHeight - clientHeight;
      const maxThumbTop = Math.max(trackHeight - thumbHeight, 0);

      if (maxScrollTop <= 0 || maxThumbTop <= 0) return;

      const scrollDelta = (deltaY / maxThumbTop) * maxScrollTop;
      const nextScrollTop = scrollStartTopRef.current + scrollDelta;

      textarea.scrollTop = Math.max(0, Math.min(maxScrollTop, nextScrollTop));
      updateScrollbar();
    },
    [thumbHeight, updateScrollbar],
  );

  const stopDragging = useCallback(
    function handleMouseUp() {
      isDraggingRef.current = false;
      document.removeEventListener('mousemove', onDragging);
      document.removeEventListener('mouseup', handleMouseUp);
    },
    [onDragging],
  );

  const startDragging = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      isDraggingRef.current = true;
      dragStartYRef.current = e.clientY;
      scrollStartTopRef.current = textarea.scrollTop;

      document.addEventListener('mousemove', onDragging);
      document.addEventListener('mouseup', stopDragging);
    },
    [onDragging, stopDragging],
  );

  useEffect(() => {
    window.addEventListener('resize', updateScrollbar);
    return () => window.removeEventListener('resize', updateScrollbar);
  }, [updateScrollbar]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', onDragging);
      document.removeEventListener('mouseup', stopDragging);
    };
  }, [onDragging, stopDragging]);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;

    onSend(trimmed);
    setValue('');

    requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.style.height = `${MIN_INPUT_HEIGHT}px`;
      textarea.scrollTop = 0;
      updateScrollbar();
    });
  }, [value, isLoading, onSend, updateScrollbar]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      requestAnimationFrame(adjustTextareaHeight);
    },
    [adjustTextareaHeight],
  );

  const handleScroll = useCallback(() => {
    updateScrollbar();
  }, [updateScrollbar]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [adjustTextareaHeight]);

  return (
    <div className="border-border bg-background/80 supports-backdrop-filter:bg-background/60 border-t backdrop-blur">
      <div className="mx-auto max-w-3xl p-4">
        <div className="border-input bg-muted/50 focus-within:border-ring focus-within:ring-ring/50 group relative flex w-full items-end gap-2 rounded-3xl border p-2 shadow-sm transition-all duration-200 focus-within:ring-2">
          <div className="relative w-full flex-1 overflow-hidden rounded-xl">
            {isScrollable && (
              <div
                className="absolute inset-y-2 right-0 z-10 w-3"
                aria-hidden="true"
              >
                <div
                  className="bg-muted-foreground/30 hover:bg-muted-foreground/50 absolute w-1.5 cursor-grab rounded-full opacity-0 transition-colors duration-300 group-hover:opacity-100 active:cursor-grabbing ltr:left-1 rtl:right-1"
                  style={{
                    height: `${thumbHeight}px`,
                    top: `${thumbTop}px`,
                  }}
                  onMouseDown={startDragging}
                />
              </div>
            )}

            <Textarea
              ref={textareaRef}
              value={value}
              autoFocus
              autoCorrect="off"
              autoComplete="off"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onScroll={handleScroll}
              aria-label={t('inputPlaceholder')}
              aria-multiline
              placeholder={t('inputPlaceholder')}
              disabled={isLoading}
              rows={2}
              style={{
                minHeight: `${MIN_INPUT_HEIGHT}px`,
                maxHeight: `${MAX_INPUT_HEIGHT}px`,
              }}
              className="resize-none rounded-xl! border-0 bg-transparent px-4 py-2.5 text-sm shadow-none [scrollbar-width:none] focus:ring-0! focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-scrollbar]:hidden"
            />
          </div>

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
