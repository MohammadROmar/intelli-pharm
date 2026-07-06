import { useEffect, useRef } from 'react';

export type ShortcutOptions = {
  key: string;
  ctrlOrMeta?: boolean;
  shift?: boolean;
  alt?: boolean;
  preventDefault?: boolean;
  ignoreInInputs?: boolean;
};

export function useKeyboardShortcut(
  options: ShortcutOptions,
  callback: () => void,
) {
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const {
        key,
        ctrlOrMeta = false,
        shift = false,
        alt = false,
        preventDefault = true,
        ignoreInInputs = true,
      } = optionsRef.current;

      if (ignoreInInputs) {
        const target = event.target as HTMLElement;
        if (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable
        ) {
          return;
        }
      }

      const isCtrlOrMetaPressed = event.ctrlKey || event.metaKey;

      const isKeyMatch = event.key.toLowerCase() === key.toLowerCase();
      const isCtrlOrMetaMatch = !!ctrlOrMeta === isCtrlOrMetaPressed;
      const isShiftMatch = !!shift === event.shiftKey;
      const isAltMatch = !!alt === event.altKey;

      if (isKeyMatch && isCtrlOrMetaMatch && isShiftMatch && isAltMatch) {
        if (preventDefault) event.preventDefault();

        callbackRef.current();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}
