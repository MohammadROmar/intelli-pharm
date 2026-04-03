import { useCallback, useEffect, useRef } from 'react';

const SCANNER_THRESHOLD_MS = 50;
const MIN_BARCODE_LENGTH = 4;

type Options = {
  enabled?: boolean;
  onScan: (barcode: string) => void;
};

export function useKeyboardBarcodeScanner({
  onScan,
  enabled = true,
}: Options): void {
  const bufferRef = useRef<string[]>([]);
  const lastKeyTimeRef = useRef<number>(0);

  const flush = useCallback(() => {
    const barcode = bufferRef.current.join('').trim();
    bufferRef.current = [];

    if (barcode.length >= MIN_BARCODE_LENGTH) {
      onScan(barcode);
    }
  }, [onScan]);

  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (isInput) return;

      const now = Date.now();
      const gap = now - lastKeyTimeRef.current;
      lastKeyTimeRef.current = now;

      if (e.key === 'Enter') {
        if (bufferRef.current.length >= MIN_BARCODE_LENGTH) {
          e.preventDefault();
          e.stopPropagation();
          flush();
        }
        return;
      }

      if (gap > SCANNER_THRESHOLD_MS) {
        bufferRef.current = [];
      }

      if (e.key.length === 1) {
        bufferRef.current.push(e.key);
      }
    }

    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [enabled, flush]);
}
