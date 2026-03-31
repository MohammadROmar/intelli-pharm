import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertCircle,
  Crosshair,
  Loader2,
  MapPin,
  Navigation,
} from 'lucide-react';

import { useLocationPickerForm } from '../model/useLocationPickerForm';
import { useGeolocation, type LatLng } from '@/shared/lib';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardSectionHeader,
  Skeleton,
} from '@/shared/ui';

const MapLocationPicker = lazy(() =>
  import('./MapLocationPicker').then((m) => ({ default: m.MapLocationPicker })),
);

function CoordinateDisplay({ position }: { position: LatLng }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.form',
  });

  return (
    <div className="bg-muted/40 flex items-center justify-between gap-4 rounded-lg px-4 py-2.5">
      <div className="flex items-center gap-1.5 text-xs">
        <Navigation className="text-muted-foreground size-3.5 shrink-0" />
        <span className="text-muted-foreground">{t('labelLatitude')}</span>
        <span className="text-foreground font-mono font-medium tabular-nums">
          {position.lat.toFixed(6)}
        </span>
      </div>
      <div className="bg-border h-4 w-px" />
      <div className="flex items-center gap-1.5 text-xs">
        <Navigation className="text-muted-foreground size-3.5 shrink-0 -rotate-90" />
        <span className="text-muted-foreground">{t('labelLongitude')}</span>
        <span className="text-foreground font-mono font-medium tabular-nums">
          {position.lng.toFixed(6)}
        </span>
      </div>
    </div>
  );
}

type GeoErrorStatus = 'denied' | 'unavailable' | 'timeout';

const GEO_ERROR_I18N: Record<GeoErrorStatus, string> = {
  denied: 'pharmaciesPage.form.geoErrorDenied',
  unavailable: 'pharmaciesPage.form.geoErrorUnavailable',
  timeout: 'pharmaciesPage.form.geoErrorTimeout',
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
  const { t } = useTranslation();

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
        {t('pharmaciesPage.form.useCurrentLocation')}
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
  const { t } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.form',
  });

  const { position, setPosition } = useLocationPickerForm();
  const geo = useGeolocation();

  const [centerOn, setCenterOn] = useState<LatLng | null>(null);
  const didSyncRef = useRef(false);

  useEffect(() => {
    if (geo.status !== 'success' || didSyncRef.current) return;
    didSyncRef.current = true;
    setPosition(geo.coords);
    setCenterOn(geo.coords);
  }, [geo.status, geo.status === 'success' ? geo.coords : null, setPosition]);

  useEffect(() => {
    if (geo.status === 'loading') {
      didSyncRef.current = false;
      setCenterOn(null);
    }
  }, [geo.status]);

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
        <Suspense fallback={<Skeleton className="h-64 w-full rounded-lg" />}>
          <MapLocationPicker
            position={position}
            onChange={setPosition}
            centerOn={centerOn}
          />
        </Suspense>

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
