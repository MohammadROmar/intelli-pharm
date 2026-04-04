import { lazy, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';

import { Skeleton } from '../ui';

const CameraScanner = lazy(() =>
  import('./CameraScanner').then((m) => ({ default: m.CameraScanner })),
);

type Props = {
  onScan: (barcode: string) => void;
};

export function BarcodeScannerView({ onScan }: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'barcode' });

  const [cameraError, setCameraError] = useState<string | null>(null);

  function handleCameraError(error: Error) {
    const isDenied = error.name === 'NotAllowedError';
    setCameraError(isDenied ? 'errorCameraDenied' : 'errorCameraUnavailable');
  }

  if (cameraError) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <AlertCircle className="text-muted-foreground size-8" />
        <p className="text-muted-foreground text-sm">{t(cameraError)}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl">
      <Suspense
        fallback={
          <Skeleton className="aspect-square max-h-64 w-full rounded-xl" />
        }
      >
        <CameraScanner
          hintText={t('scanHint')}
          onScan={onScan}
          onError={handleCameraError}
        />
      </Suspense>
    </div>
  );
}
