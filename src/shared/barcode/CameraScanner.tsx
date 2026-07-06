import { useId, useRef } from 'react';

import { useHtml5QrScanner } from '@/shared/barcode';

type Props = {
  hintText: string;
  onScan: (barcode: string) => void;
  onError: (error: Error) => void;
};

const DEDUPE_INTERVAL_MS = 2000;

export function CameraScanner({ hintText, onScan, onError }: Props) {
  const uid = useId();
  const elementId = `html5-qr-${uid.replace(/[:-]/g, '')}`;

  const lastScanRef = useRef<string | null>(null);
  const lastScanTimeRef = useRef<number>(0);

  const handleScan = (barcode: string): void => {
    const now = Date.now();
    if (
      barcode === lastScanRef.current &&
      now - lastScanTimeRef.current < DEDUPE_INTERVAL_MS
    ) {
      return;
    }

    lastScanRef.current = barcode;
    lastScanTimeRef.current = now;
    onScan(barcode);
  };

  useHtml5QrScanner({ elementId, onScan: handleScan, onError });

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl">
      <div
        id={elementId}
        aria-hidden="true"
        className="h-full w-full [&>video]:object-cover"
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="border-primary/50 relative h-32 w-64 rounded-lg border-2 bg-white/5 backdrop-blur-[1px]">
          <div className="border-primary absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2" />
          <div className="border-primary absolute -top-1 -right-1 h-4 w-4 border-t-2 border-r-2" />
          <div className="border-primary absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2" />
          <div className="border-primary absolute -right-1 -bottom-1 h-4 w-4 border-r-2 border-b-2" />
        </div>
      </div>

      <div className="absolute right-0 bottom-6 left-0 text-center">
        <p className="text-[11px] font-medium tracking-[0.2em] text-zinc-300 uppercase drop-shadow-md">
          {hintText}
        </p>
      </div>
    </div>
  );
}
