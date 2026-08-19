import { useState } from 'react';
import { Marker, Polyline, Popup } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { PlanPath, PlanVisit } from '@/entities/plan';
import { MapView } from '@/shared/map';
import { Button } from '@/shared/ui';

import { MapBoundsController } from './MapBoundsController';
import { PharmacyPopupContent } from './PharmacyPopupContent';
import { START_ICON } from '../config/planIcons';
import { getPathColor } from '../lib/helpers';
import { useDecodedRoute } from '../model/useDecodedRoute';

type Props = {
  paths: PlanPath[];
  visits: PlanVisit[];
  canViewPharmacy: boolean;
};

export default function PlanRouteStepMap({
  paths,
  visits,
  canViewPharmacy,
}: Props) {
  const { t } = useTranslation('plan', { keyPrefix: 'detail.map' });

  const {
    paths: sortedPaths,
    decodedPaths,
    visitByOrder,
    startPoint,
    markersByOrder,
  } = useDecodedRoute(paths, visits);

  const [stepIndex, setStepIndex] = useState(0);
  const stepCount = sortedPaths.length;

  const safeIndex = Math.min(stepIndex, Math.max(stepCount - 1, 0));

  const goPrev = () => setStepIndex((i) => Math.max(0, i - 1));
  const goNext = () => setStepIndex((i) => Math.min(stepCount - 1, i + 1));

  const currentPath = sortedPaths[safeIndex];
  const currentPoints = decodedPaths[safeIndex];

  const isStartStep = currentPath?.from_sequence === 0;
  const fromMarker =
    currentPath && !isStartStep
      ? markersByOrder.get(currentPath.from_sequence)
      : undefined;
  const toMarker = currentPath
    ? markersByOrder.get(currentPath.to_sequence)
    : undefined;

  const stepLabel = t('steps.counter', {
    current: safeIndex + 1,
    total: stepCount,
  });

  if (!currentPath || !currentPoints) {
    return (
      <div className="text-muted-foreground flex h-105 w-full items-center justify-center rounded-lg border text-sm">
        {t('steps.empty')}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative z-0 h-105 w-full overflow-hidden rounded-lg">
        <MapView
          center={[33.5138, 36.2765]}
          zoom={13}
          className="h-full w-full"
        >
          {currentPoints.length >= 2 && (
            <Polyline
              positions={currentPoints}
              pathOptions={{
                color: getPathColor(visitByOrder.get(currentPath.to_sequence)),
                weight: 5,
                opacity: 0.9,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
          )}

          {isStartStep && startPoint && (
            <Marker position={startPoint} icon={START_ICON}>
              <Popup className="font-cairo">
                <span className="text-sm font-medium">{t('startPoint')}</span>
              </Popup>
            </Marker>
          )}

          {fromMarker && (
            <Marker position={fromMarker.position} icon={fromMarker.icon}>
              <Popup className="font-cairo">
                <PharmacyPopupContent
                  marker={fromMarker}
                  stopLabel={t('stop')}
                  canViewPharmacy={canViewPharmacy}
                />
              </Popup>
            </Marker>
          )}

          {toMarker && (
            <Marker position={toMarker.position} icon={toMarker.icon}>
              <Popup className="font-cairo">
                <PharmacyPopupContent
                  marker={toMarker}
                  stopLabel={t('stop')}
                  canViewPharmacy={canViewPharmacy}
                />
              </Popup>
            </Marker>
          )}

          <MapBoundsController allPoints={currentPoints} />
        </MapView>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={goPrev}
          disabled={safeIndex === 0}
        >
          <ChevronLeft className="size-4 shrink-0 rtl:rotate-180" />
          {t('steps.prev')}
        </Button>

        <span className="text-muted-foreground text-xs">{stepLabel}</span>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={goNext}
          disabled={safeIndex === stepCount - 1}
        >
          {t('steps.next')}
          <ChevronRight className="size-4 shrink-0 rtl:rotate-180" />
        </Button>
      </div>
    </div>
  );
}
