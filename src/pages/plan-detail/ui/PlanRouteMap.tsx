import L, { type LatLngTuple } from 'leaflet';
import { Marker, Polyline, Popup } from 'react-leaflet';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Route } from 'lucide-react';

import { useFormatDistance, useFormatDuration } from '@/entities/plan';
import type { PlanPath, PlanVisit } from '@/entities/plan';
import { decodePolyline, MapView } from '@/shared/map';
import { LabeledLink } from '@/shared/ui';

import { getStopIcon, START_ICON } from '../config/planIcons';
import { getPathColor, isVisited } from '../lib/helpers';
import { MapBoundsController } from './MapBoundsController';

type PharmacyMarker = {
  position: LatLngTuple;
  visit: PlanVisit;
  icon: L.DivIcon;
  distanceLabel: string;
  durationLabel: string;
};

type RoutePolylinesProps = {
  paths: PlanPath[];
  decodedPaths: LatLngTuple[][];
  visitByOrder: Map<number, PlanVisit>;
};

const RoutePolylines = memo(function RoutePolylines({
  paths,
  decodedPaths,
  visitByOrder,
}: RoutePolylinesProps) {
  return (
    <>
      {paths.map((path, i) => {
        const decoded = decodedPaths[i];
        if (!decoded || decoded.length < 2) return null;
        return (
          <Polyline
            key={path.id}
            positions={decoded}
            pathOptions={{
              color: getPathColor(visitByOrder.get(path.to_sequence)),
              weight: 5,
              opacity: 0.85,
              lineCap: 'round',
              lineJoin: 'round',
            }}
          />
        );
      })}
    </>
  );
});

type PharmacyMarkersProps = {
  markers: PharmacyMarker[];
  stopLabel: string;
};

const PharmacyMarkers = memo(function PharmacyMarkers({
  markers,
  stopLabel,
}: PharmacyMarkersProps) {
  return (
    <>
      {markers.map(
        ({ position, visit, icon, distanceLabel, durationLabel }) => (
          <Marker key={visit.id} position={position} icon={icon}>
            <Popup className="font-cairo">
              <div className="min-w-45 space-y-0.5!">
                <div className="w-fit">
                  <LabeledLink
                    to={`/dashboard/pharmacies/${visit.pharmacy.id}`}
                    label={visit.pharmacy.name}
                    className="text-card-foreground! hover:text-primary! text-left! text-sm leading-snug font-semibold"
                  />
                </div>

                <p className="text-muted-foreground text-xs">
                  {visit.pharmacy.info}
                </p>
                <p className="text-muted-foreground mt-2! pt-1 text-xs leading-none">
                  {stopLabel} #{visit.visit_order}
                </p>
                <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Route className="size-3 shrink-0" />
                    {distanceLabel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3 shrink-0" />
                    {durationLabel}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ),
      )}
    </>
  );
});

type Props = { paths: PlanPath[]; visits: PlanVisit[] };

export default function PlanRouteMap({ paths, visits }: Props) {
  const { t } = useTranslation('plan', { keyPrefix: 'detail.map' });

  const formatDistance = useFormatDistance();
  const formatDuration = useFormatDuration();

  const visitByOrder = useMemo(
    () => new Map(visits.map((v) => [v.visit_order, v])),
    [visits],
  );

  const decodedPaths = useMemo(
    () => paths.map((p) => decodePolyline(p.geometry) as LatLngTuple[]),
    [paths],
  );

  const allPoints = useMemo(() => decodedPaths.flat(), [decodedPaths]);

  const startPoint = useMemo<LatLngTuple | undefined>(() => {
    const firstPathIdx = paths.findIndex((p) => p.from_sequence === 0);
    return decodedPaths[firstPathIdx]?.[0];
  }, [paths, decodedPaths]);

  const pharmacyMarkers = useMemo<PharmacyMarker[]>(
    () =>
      paths.flatMap((path, i) => {
        if (path.to_sequence === 0) return [];
        const decoded = decodedPaths[i];
        const position = decoded?.[decoded.length - 1] as
          | LatLngTuple
          | undefined;
        const visit = visitByOrder.get(path.to_sequence);
        if (!position || !visit) return [];
        return [
          {
            position,
            visit,
            icon: getStopIcon(visit.visit_order, isVisited(visit)),
            distanceLabel: formatDistance(path.distance_m),
            durationLabel: formatDuration(path.duration_sec),
          },
        ];
      }),
    [paths, decodedPaths, visitByOrder, formatDistance, formatDuration],
  );

  return (
    <div className="relative z-0 h-105 w-full overflow-hidden rounded-lg">
      <MapView center={[33.5138, 36.2765]} zoom={13} className="h-full w-full">
        <RoutePolylines
          paths={paths}
          decodedPaths={decodedPaths}
          visitByOrder={visitByOrder}
        />

        {startPoint && (
          <Marker position={startPoint} icon={START_ICON}>
            <Popup className="font-cairo">
              <span className="text-sm font-medium">{t('startPoint')}</span>
            </Popup>
          </Marker>
        )}

        <PharmacyMarkers markers={pharmacyMarkers} stopLabel={t('stop')} />

        {allPoints.length > 0 && <MapBoundsController allPoints={allPoints} />}
      </MapView>
    </div>
  );
}
