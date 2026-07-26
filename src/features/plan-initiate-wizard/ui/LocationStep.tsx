import { lazy, Suspense, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Crosshair, Loader2, MapPin } from 'lucide-react';

import { ErrorBoundary, useGeolocation, type LatLng } from '@/shared/lib';
import { CoordinateDisplay } from '@/shared/map';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardSectionHeader,
  SectionErrorFallback,
  Skeleton,
} from '@/shared/ui';

import { WizardNavigation } from './WizardNavigation';
import type { WizardStepProps } from '../model/types';

const MapLocationPicker = lazy(() =>
  import('@/shared/map').then((m) => ({ default: m.MapLocationPicker })),
);

const DEFAULT_CENTER: LatLng = { lat: 33.5138, lng: 36.2765 };

export function LocationStep({ state, dispatch, totalSteps }: WizardStepProps) {
  const { t } = useTranslation('planner');
  const geo = useGeolocation();

  const position: LatLng = {
    lat: state.location.current_latitude ?? DEFAULT_CENTER.lat,
    lng: state.location.current_longitude ?? DEFAULT_CENTER.lng,
  };

  const hasLocation =
    state.location.current_latitude !== null &&
    state.location.current_longitude !== null;

  const geoLat = geo.status === 'success' ? geo.coords.lat : null;
  const geoLng = geo.status === 'success' ? geo.coords.lng : null;

  const centerOn = useMemo<LatLng | null>(
    () =>
      geoLat !== null && geoLng !== null ? { lat: geoLat, lng: geoLng } : null,
    [geoLat, geoLng],
  );

  const didSyncRef = useRef(false);

  useEffect(() => {
    if (geo.status === 'loading') {
      didSyncRef.current = false;
      return;
    }

    if (
      geo.status !== 'success' ||
      didSyncRef.current ||
      geoLat === null ||
      geoLng === null
    ) {
      return;
    }

    didSyncRef.current = true;
    dispatch({
      type: 'UPDATE_LOCATION',
      payload: { current_latitude: geoLat, current_longitude: geoLng },
    });
  }, [geo.status, geoLat, geoLng, dispatch]);

  function handlePositionChange(next: LatLng) {
    dispatch({
      type: 'UPDATE_LOCATION',
      payload: { current_latitude: next.lat, current_longitude: next.lng },
    });
  }

  const GEO_ERROR: Record<string, string> = {
    denied: t('location.errorDenied'),
    unavailable: t('location.errorUnavailable'),
    timeout: t('location.errorTimeout'),
  };

  const isGeoError =
    geo.status === 'denied' ||
    geo.status === 'unavailable' ||
    geo.status === 'timeout';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardSectionHeader
            title={t('location.cardTitle')}
            description={t('location.cardSubtitle')}
            icon={MapPin}
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <ErrorBoundary FallbackComponent={SectionErrorFallback}>
            <Suspense
              fallback={<Skeleton className="h-64 w-full rounded-xl" />}
            >
              <MapLocationPicker
                position={position}
                onChange={handlePositionChange}
                centerOn={centerOn}
              />
            </Suspense>
          </ErrorBoundary>
          <CoordinateDisplay position={position} />
          <div className="space-y-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={geo.requestLocation}
              disabled={geo.status === 'loading'}
              className="gap-2"
            >
              {geo.status === 'loading' ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Crosshair className="size-4" />
              )}
              {t('location.useCurrentLocation')}
            </Button>
            {isGeoError && (
              <p className="text-destructive flex items-center gap-1.5 text-xs">
                <AlertCircle className="size-3.5 shrink-0" />
                {GEO_ERROR[geo.status] ?? t('location.errorUnavailable')}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <WizardNavigation
        step={state.step}
        dispatch={dispatch}
        totalSteps={totalSteps}
        canProceed={hasLocation}
      />
    </div>
  );
}
