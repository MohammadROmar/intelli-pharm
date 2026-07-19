import { useEffect, useRef } from 'react';
import L, { type LatLngTuple } from 'leaflet';
import { useMap } from 'react-leaflet';

import {
  TrackingMarkersLayer,
  TrackingConnectionBanner,
  TrackingPermissionDenied,
  useTrackingConnection,
  useTrackingIds,
  getPosition,
  type TrackingFilter,
} from '@/entities/tracking';
import { MapView } from '@/shared/map';

const DEFAULT_CENTER: [number, number] = [33.5138, 36.2765];

type AutoFitControllerProps = { ids: number[] };

function AutoFitController({ ids }: AutoFitControllerProps) {
  const map = useMap();
  const lastFitSignatureRef = useRef<string | null>(null);

  useEffect(() => {
    const signature = ids.join(',');
    if (ids.length === 0 || lastFitSignatureRef.current === signature) return;
    lastFitSignatureRef.current = signature;

    const points: LatLngTuple[] = [];
    for (const id of ids) {
      const position = getPosition(id);
      if (position) points.push([position.lat, position.lon]);
    }

    if (points.length > 0) {
      map.fitBounds(L.latLngBounds(points), { padding: [48, 48], maxZoom: 15 });
    }
  }, [ids, map]);

  return null;
}

type Props = { filter: TrackingFilter };

export function LiveTrackingMap({ filter }: Props) {
  const { permissionDenied } = useTrackingConnection();
  const ids = useTrackingIds(filter);

  if (permissionDenied) {
    return <TrackingPermissionDenied className="h-140" />;
  }

  return (
    <div className="relative z-0 h-140 w-full overflow-hidden rounded-lg">
      <MapView center={DEFAULT_CENTER} zoom={12} className="z-0 h-full w-full">
        <TrackingMarkersLayer filter={filter} />
        <AutoFitController ids={ids} />
      </MapView>
      <TrackingConnectionBanner />
    </div>
  );
}
