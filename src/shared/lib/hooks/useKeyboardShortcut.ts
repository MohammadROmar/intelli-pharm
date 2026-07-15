import { useEffect } from 'react';
import type { RefObject } from 'react';

import { useLatestRef } from './useLatestRef';

export type ShortcutTarget =
  | RefObject<HTMLElement | null>
  | HTMLElement
  | Document;

type KeyMatcher =
  | { key: string | string[]; code?: never }
  | { key?: never; code: string | string[] };

export type ShortcutOptions = KeyMatcher & {
  ctrlOrMeta?: boolean;
  shift?: boolean;
  alt?: boolean;
  preventDefault?: boolean;
  ignoreInInputs?: boolean;
  ignoreRepeat?: boolean;
  capture?: boolean;
  target?: ShortcutTarget;
};

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

function resolveTarget(target: ShortcutTarget | undefined): EventTarget | null {
  if (target === undefined) return document;
  if ('current' in target) return target.current;
  return target;
}

function isEditableElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.isContentEditable
  );
}

export function useKeyboardShortcut(
  options: ShortcutOptions,
  callback: () => void,
) {
  const optionsRef = useLatestRef(options);
  const callbackRef = useLatestRef(callback);

  const { target, capture = false } = options;

  useEffect(() => {
    const element = resolveTarget(target);
    if (!element) return;

    const handleKeyDown = (nativeEvent: Event) => {
      const event = nativeEvent as KeyboardEvent;
      const {
        key,
        code,
        ctrlOrMeta = false,
        shift = false,
        alt = false,
        preventDefault = true,
        ignoreInInputs = true,
        ignoreRepeat = false,
      } = optionsRef.current;

      if (ignoreRepeat && event.repeat) return;
      if (ignoreInInputs && isEditableElement(event.target)) return;

      const isKeyMatch =
        key !== undefined
          ? toArray(key).some(
              (candidate) =>
                candidate.toLowerCase() === event.key.toLowerCase(),
            )
          : toArray(code).some((candidate) => candidate === event.code);

      if (!isKeyMatch) return;

      const isCtrlOrMetaMatch = ctrlOrMeta === (event.ctrlKey || event.metaKey);
      const isShiftMatch = shift === event.shiftKey;
      const isAltMatch = alt === event.altKey;

      if (isCtrlOrMetaMatch && isShiftMatch && isAltMatch) {
        if (preventDefault) event.preventDefault();
        callbackRef.current();
      }
    };

    element.addEventListener('keydown', handleKeyDown, { capture });
    return () =>
      element.removeEventListener('keydown', handleKeyDown, { capture });
  }, [target, capture, optionsRef, callbackRef]);
}
