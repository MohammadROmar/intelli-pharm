import { useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';

type Options = {
  elementId: string;
  onScan: (barcode: string) => void;
  onError?: (error: Error) => void;
};

const SCAN_FPS = 10;
const SCAN_BOX_SIZE = 250;
const SCANNER_START_TIMEOUT_MS = 15_000;

let scannerQueue: Promise<Html5Qrcode | null> = Promise.resolve(null);

function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  message: string,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = setTimeout(() => reject(new Error(message)), ms);

    promise.then(
      (value) => {
        clearTimeout(timeoutId);
        resolve(value);
      },
      (error) => {
        clearTimeout(timeoutId);
        reject(error);
      },
    );
  });
}

async function stopAndClear(scanner: Html5Qrcode): Promise<void> {
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
    console.warn('Failed to stop barcode scanner instance', error);
  }
}

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
        await stopAndClear(existingScanner);
      }

      if (isCancelled) return null;

      try {
        const container = document.getElementById(elementId);
        if (container) {
          container.innerHTML = '';
        }

        const scanner = new Html5Qrcode(elementId, { verbose: false });
        const startPromise = scanner.start(
          { facingMode: 'environment' },
          {
            fps: SCAN_FPS,
            qrbox: { width: SCAN_BOX_SIZE, height: SCAN_BOX_SIZE },
          },
          (decodedText: string) => {
            if (!isCancelled) onScanRef.current(decodedText);
          },
          () => {},
        );

        try {
          await withTimeout(
            startPromise,
            SCANNER_START_TIMEOUT_MS,
            'Camera failed to start in time',
          );
        } catch (startError) {
          startPromise.then(() => stopAndClear(scanner)).catch(() => {});
          throw startError;
        }

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
        await stopAndClear(scanner);
        return null;
      });
    };
  }, [elementId]);
}
