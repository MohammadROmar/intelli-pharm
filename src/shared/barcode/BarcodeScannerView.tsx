import { lazy, Suspense, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';

import { ErrorBoundary } from '../lib';
import { Button, SectionErrorFallback, Skeleton } from '../ui';

const CameraScanner = lazy(() =>
  import('./CameraScanner').then((m) => ({ default: m.CameraScanner })),
);

type Props = {
  onScan: (barcode: string) => void;
};

type CameraErrorReason =
  | 'errorCameraDenied'
  | 'errorCameraNotFound'
  | 'errorCameraInUse'
  | 'errorCameraUnavailable';

function classifyCameraError(error: Error): CameraErrorReason {
  const signal = `${error.name} ${error.message}`;

  if (/NotAllowedError|PermissionDenied/i.test(signal))
    return 'errorCameraDenied';
  if (/NotFoundError|OverconstrainedError/i.test(signal))
    return 'errorCameraNotFound';
  if (/NotReadableError|TrackStartError/i.test(signal))
    return 'errorCameraInUse';
  return 'errorCameraUnavailable';
}

export function BarcodeScannerView({ onScan }: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'barcode' });

  const [cameraError, setCameraError] = useState<CameraErrorReason | null>(
    null,
  );
  const [retryCount, setRetryCount] = useState(0);

  const handleCameraError = useCallback((error: Error) => {
    setCameraError(classifyCameraError(error));
  }, []);

  const handleRetry = useCallback(() => {
    setCameraError(null);
    setRetryCount((count) => count + 1);
  }, []);

  if (cameraError) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <AlertCircle className="text-muted-foreground size-8" />
        <p className="text-muted-foreground text-sm">{t(cameraError)}</p>
        <Button variant="outline" size="sm" onClick={handleRetry}>
          {t('retry')}
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl">
      <ErrorBoundary FallbackComponent={SectionErrorFallback}>
        <Suspense
          fallback={
            <Skeleton className="aspect-square max-h-64 w-full rounded-xl" />
          }
        >
          <CameraScanner
            key={retryCount}
            hintText={t('scanHint')}
            onScan={onScan}
            onError={handleCameraError}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
