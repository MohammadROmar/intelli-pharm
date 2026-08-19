import type { LatLngTuple } from 'leaflet';
import { Marker, Polyline, Popup } from 'react-leaflet';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { PlanPath, PlanVisit } from '@/entities/plan';
import { MapView } from '@/shared/map';

import { MapBoundsController } from './MapBoundsController';
import { PharmacyPopupContent } from './PharmacyPopupContent';
import { START_ICON } from '../config/planIcons';
import { getPathColor } from '../lib/helpers';
import { useDecodedRoute, type PharmacyMarker } from '../model/useDecodedRoute';

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
  canViewPharmacy: boolean;
};

const PharmacyMarkers = memo(function PharmacyMarkers({
  markers,
  stopLabel,
  canViewPharmacy,
}: PharmacyMarkersProps) {
  return (
    <>
      {markers.map((marker) => (
        <Marker
          key={marker.visit.id}
          position={marker.position}
          icon={marker.icon}
        >
          <Popup className="font-cairo">
            <PharmacyPopupContent
              marker={marker}
              stopLabel={stopLabel}
              canViewPharmacy={canViewPharmacy}
            />
          </Popup>
        </Marker>
      ))}
    </>
  );
});

type Props = {
  paths: PlanPath[];
  visits: PlanVisit[];
  canViewPharmacy: boolean;
};

export default function PlanRouteMap({
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
    allPoints,
    pharmacyMarkers,
  } = useDecodedRoute(paths, visits);

  return (
    <div className="relative z-0 h-105 w-full overflow-hidden rounded-lg">
      <MapView center={[33.5138, 36.2765]} zoom={13} className="h-full w-full">
        <RoutePolylines
          paths={sortedPaths}
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

        <PharmacyMarkers
          markers={pharmacyMarkers}
          stopLabel={t('stop')}
          canViewPharmacy={canViewPharmacy}
        />

        {allPoints.length > 0 && <MapBoundsController allPoints={allPoints} />}
      </MapView>
    </div>
  );
}
