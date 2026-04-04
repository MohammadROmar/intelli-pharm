import { useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';

type Options = {
  elementId: string;
  onScan: (barcode: string) => void;
  onError?: (error: Error) => void;
};

let scannerQueue: Promise<Html5Qrcode | null> = Promise.resolve(null);

export function useHtml5QrScanner({
  elementId,
  onScan,
  onError,
}: Options): void {
  const onScanRef = useRef(onScan);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onScanRef.current = onScan;
    onErrorRef.current = onError;
  }, [onScan, onError]);

  useEffect(() => {
    let isCancelled = false;

    scannerQueue = scannerQueue.then(async (existingScanner) => {
      if (existingScanner) {
        try {
          if (
            existingScanner.getState() === Html5QrcodeScannerState.SCANNING ||
            existingScanner.getState() === Html5QrcodeScannerState.PAUSED
          ) {
            await existingScanner.stop();
          }
          existingScanner.clear();
        } catch (e) {
          console.warn('Failed to stop ghost scanner instance', e);
        }
      }

      if (isCancelled) return null;

      try {
        const container = document.getElementById(elementId);
        if (container) {
          container.innerHTML = '';
        }

        const scanner = new Html5Qrcode(elementId, { verbose: false });

        await scanner.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText: string) => {
            if (!isCancelled) onScanRef.current(decodedText);
          },
          () => {},
        );

        return scanner;
      } catch (error) {
        if (!isCancelled) {
          const err = error instanceof Error ? error : new Error(String(error));
          onErrorRef.current?.(err);
        }
        return null;
      }
    });

    return () => {
      isCancelled = true;

      scannerQueue = scannerQueue.then(async (scanner) => {
        if (!scanner) return null;

        try {
          const state = scanner.getState();
          if (
            state === Html5QrcodeScannerState.SCANNING ||
            state === Html5QrcodeScannerState.PAUSED
          ) {
            await scanner.stop();
          }
          scanner.clear();
        } catch (error) {
          console.warn('Error stopping scanner during cleanup:', error);
        }

        return null;
      });
    };
  }, [elementId]);
}
