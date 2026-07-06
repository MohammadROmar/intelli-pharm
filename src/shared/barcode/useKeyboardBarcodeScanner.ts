import { useEffect, useRef } from 'react';

const SCANNER_THRESHOLD_MS = 50;
const MIN_BARCODE_LENGTH = 4;

type Options = { enabled?: boolean; onScan: (barcode: string) => void };

type ScanCallbackRef = { current: (barcode: string) => void };

const listenerStack: ScanCallbackRef[] = [];
const keyBuffer: string[] = [];
let lastKeyTime = 0;
let isWindowListenerAttached = false;

function flush() {
  const barcode = keyBuffer.join('').trim();
  keyBuffer.length = 0;

  if (barcode.length < MIN_BARCODE_LENGTH) return;

  const activeListener = listenerStack[listenerStack.length - 1];
  activeListener?.current(barcode);
}

function handleWindowKeyDown(e: KeyboardEvent) {
  if (listenerStack.length === 0) return;

  const target = e.target as HTMLElement;
  const isEditableTarget =
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.isContentEditable;

  if (isEditableTarget) return;

  if (e.ctrlKey || e.metaKey || e.altKey) return;

  const now = Date.now();
  const gap = now - lastKeyTime;
  lastKeyTime = now;

  if (e.key === 'Enter') {
    if (keyBuffer.length >= MIN_BARCODE_LENGTH) {
      e.preventDefault();
      e.stopPropagation();
      flush();
    } else {
      keyBuffer.length = 0;
    }
    return;
  }

  if (gap > SCANNER_THRESHOLD_MS) {
    keyBuffer.length = 0;
  }

  if (e.key.length === 1) {
    keyBuffer.push(e.key);
  }
}

function attachWindowListenerIfNeeded() {
  if (isWindowListenerAttached) return;
  isWindowListenerAttached = true;
  window.addEventListener('keydown', handleWindowKeyDown, true);
}

function detachWindowListenerIfIdle() {
  if (listenerStack.length > 0 || !isWindowListenerAttached) return;
  window.removeEventListener('keydown', handleWindowKeyDown, true);
  isWindowListenerAttached = false;
  keyBuffer.length = 0;
}

export function useKeyboardBarcodeScanner({ onScan, enabled = true }: Options) {
  const onScanRef = useRef(onScan);

  useEffect(() => {
    onScanRef.current = onScan;
  }, [onScan]);

  useEffect(() => {
    if (!enabled) return;

    listenerStack.push(onScanRef);
    attachWindowListenerIfNeeded();

    return () => {
      const index = listenerStack.indexOf(onScanRef);
      if (index !== -1) listenerStack.splice(index, 1);
      detachWindowListenerIfIdle();
    };
  }, [enabled]);
}
