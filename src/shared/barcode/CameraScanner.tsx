import { useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';

type Props = {
  onScan: (barcode: string) => void;
  onError: (error: Error) => void;
};

export function CameraScanner({ onScan, onError }: Props) {
  const isSupported =
    typeof navigator !== 'undefined' && !!navigator.mediaDevices;

  useEffect(() => {
    if (!isSupported) {
      const error = new Error(
        'Camera access requires a secure connection (HTTPS or localhost).',
      );
      error.name = 'NotSupportedError';
      onError(error);
    }
  }, [isSupported, onError]);

  if (!isSupported) return null;

  function handleScan(detections: IDetectedBarcode[]) {
    if (!detections || detections.length === 0) return;

    const first = detections[0];
    if (first?.rawValue) {
      onScan(first.rawValue);
    }
  }

  return (
    <div className="relative aspect-square max-h-64 w-full overflow-hidden rounded-lg bg-black">
      <Scanner
        onScan={handleScan}
        onError={(err: unknown) => {
          const normalizedError =
            err instanceof Error ? err : new Error(String(err));
          onError(normalizedError);
        }}
        formats={['data_matrix', 'ean_13', 'code_128', 'ean_8', 'qr_code']}
        allowMultiple={false}
        scanDelay={500}
        components={{
          torch: true,
          zoom: true,
          finder: true,
        }}
        styles={{
          container: {
            width: '100%',
            height: '100%',
          },
        }}
      />
    </div>
  );
}
