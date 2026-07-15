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
const DUPLICATE_SCAN_WINDOW_MS = 1_500;

let cameraSessionQueue: Promise<Html5Qrcode | null> = Promise.resolve(null);

function enqueueCameraTask(
  task: (current: Html5Qrcode | null) => Promise<Html5Qrcode | null>,
): Promise<Html5Qrcode | null> {
  cameraSessionQueue = cameraSessionQueue.then(task);
  return cameraSessionQueue;
}

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
  const lastScanRef = useRef<{ value: string; time: number } | null>(null);

  useEffect(() => {
    onScanRef.current = onScan;
    onErrorRef.current = onError;
  }, [onScan, onError]);

  useEffect(() => {
    let isCancelled = false;

    enqueueCameraTask(async (existingScanner) => {
      if (existingScanner) {
        await stopAndClear(existingScanner);
      }

      if (isCancelled) return null;

      try {
        const scanner = new Html5Qrcode(elementId, { verbose: false });
        const startPromise = scanner.start(
          { facingMode: 'environment' },
          {
            fps: SCAN_FPS,
            qrbox: { width: SCAN_BOX_SIZE, height: SCAN_BOX_SIZE },
          },
          (decodedText: string) => {
            if (isCancelled) return;

            const now = Date.now();
            const last = lastScanRef.current;
            if (
              last &&
              last.value === decodedText &&
              now - last.time < DUPLICATE_SCAN_WINDOW_MS
            ) {
              return;
            }
            lastScanRef.current = { value: decodedText, time: now };
            onScanRef.current(decodedText);
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

        if (isCancelled) {
          await stopAndClear(scanner);
          return null;
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

      enqueueCameraTask(async (scanner) => {
        if (!scanner) return null;
        await stopAndClear(scanner);
        return null;
      });
    };
  }, [elementId]);
}
