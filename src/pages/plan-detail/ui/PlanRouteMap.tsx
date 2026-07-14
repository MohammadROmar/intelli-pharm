import 'leaflet/dist/leaflet.css';

import L, { type LatLngTuple } from 'leaflet';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Route } from 'lucide-react';

import { useFormatDistance, useFormatDuration } from '@/entities/plan';
import type { PlanPath, PlanVisit } from '@/entities/plan';
import { decodePolyline } from '@/shared/map';
import { LabeledLink } from '@/shared/ui';

const ICON_BASE_STYLE =
  'border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;';

const ROUTE_COLORS = {
  start: '#3b82f6',
  visited: '#16a34a',
  pending: '#4a80f5',
  neutral: '#94a3b8',
} as const;

function isVisited(visit: Pick<PlanVisit, 'visited'>): boolean {
  return visit.visited === 1;
}

function getPathColor(visit: PlanVisit | undefined): string {
  if (!visit) return ROUTE_COLORS.neutral;
  return isVisited(visit) ? ROUTE_COLORS.visited : ROUTE_COLORS.pending;
}

const stopIconCache = new Map<string, L.DivIcon>();

function getStopIcon(order: number, visited: boolean): L.DivIcon {
  const key = `${order}-${visited}`;
  const cached = stopIconCache.get(key);
  if (cached) return cached;

  const bg = visited ? ROUTE_COLORS.visited : ROUTE_COLORS.pending;
  const icon = L.divIcon({
    className: '',
    html: `<div style="width:32px;height:32px;${ICON_BASE_STYLE}background:${bg};color:white;font-weight:700;font-size:13px;font-family:system-ui;">${order}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -22],
  });

  stopIconCache.set(key, icon);
  return icon;
}

const START_ICON = L.divIcon({
  className: '',
  html: `<div style="width:36px;height:36px;${ICON_BASE_STYLE}background:${ROUTE_COLORS.start};"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -24],
});

type MapBoundsControllerProps = { allPoints: LatLngTuple[] };

function MapBoundsController({ allPoints }: MapBoundsControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (allPoints.length === 0) return;
    map.fitBounds(L.latLngBounds(allPoints), { padding: [48, 48] });
  }, [map, allPoints]);

  return null;
}

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
                    <Route className="size-3" />
                    {distanceLabel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
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
      <MapContainer
        center={[33.5138, 36.2765]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

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
      </MapContainer>
    </div>
  );
}
