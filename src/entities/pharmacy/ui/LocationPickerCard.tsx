import { lazy, Suspense, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Crosshair, Loader2, MapPin } from 'lucide-react';

import { CoordinateDisplay } from '@/shared/map';
import { ErrorBoundary, useGeolocation } from '@/shared/lib';
import {
  Card,
  Button,
  Skeleton,
  CardHeader,
  CardContent,
  CardSectionHeader,
  SectionErrorFallback,
} from '@/shared/ui';

import { useLocationPickerForm } from '../model/useLocationPickerForm';

const MapLocationPicker = lazy(() =>
  import('@/shared/map').then((m) => ({ default: m.MapLocationPicker })),
);

type GeoErrorStatus = 'denied' | 'unavailable' | 'timeout';

const GEO_ERROR_I18N: Record<GeoErrorStatus, string> = {
  denied: 'form.geoErrorDenied',
  unavailable: 'form.geoErrorUnavailable',
  timeout: 'form.geoErrorTimeout',
};

type CurrentLocationButtonProps = {
  isPending?: boolean;
  onRequest: () => void;
  geoStatus: ReturnType<typeof useGeolocation>['status'];
};

function CurrentLocationButton({
  isPending,
  onRequest,
  geoStatus,
}: CurrentLocationButtonProps) {
  const { t } = useTranslation('pharmacies', { keyPrefix: 'form' });

  const isLoading = geoStatus === 'loading';
  const isError =
    geoStatus === 'denied' ||
    geoStatus === 'unavailable' ||
    geoStatus === 'timeout';

  return (
    <div className="space-y-1.5">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onRequest}
        disabled={isPending || isLoading}
        className="gap-2"
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Crosshair className="size-4" />
        )}
        {t('useCurrentLocation')}
      </Button>

      {isError && (
        <p className="text-destructive flex items-center gap-1.5 text-xs">
          <AlertCircle className="size-3.5 shrink-0" />
          {t(GEO_ERROR_I18N[geoStatus as GeoErrorStatus])}
        </p>
      )}
    </div>
  );
}

type Props = { isPending?: boolean };

export function LocationPickerCard({ isPending }: Props) {
  const { t } = useTranslation('pharmacies', {
    keyPrefix: 'form',
  });

  const { position, setPosition } = useLocationPickerForm();
  const geo = useGeolocation();

  const didSyncRef = useRef(false);

  useEffect(() => {
    if (geo.status === 'loading') {
      didSyncRef.current = false;
      return;
    }
    if (geo.status !== 'success' || didSyncRef.current) return;

    didSyncRef.current = true;
    setPosition(geo.coords);
  }, [geo.status, geo.coords, setPosition]);
  const centerOn = geo.status === 'success' ? geo.coords : null;

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={MapPin}
          title={t('locationPickerTitle')}
          description={t('locationPickerSubtitle')}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        <ErrorBoundary FallbackComponent={SectionErrorFallback}>
          <Suspense fallback={<Skeleton className="h-64 w-full rounded-lg" />}>
            <MapLocationPicker
              position={position}
              onChange={setPosition}
              centerOn={centerOn}
            />
          </Suspense>
        </ErrorBoundary>

        <CoordinateDisplay position={position} />

        <CurrentLocationButton
          isPending={isPending}
          onRequest={geo.requestLocation}
          geoStatus={geo.status}
        />
      </CardContent>
    </Card>
  );
}
