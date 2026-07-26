import { useEffect } from 'react';
import L, { type LatLngTuple } from 'leaflet';
import { useMap } from 'react-leaflet';

type MapBoundsControllerProps = { allPoints: LatLngTuple[] };

export function MapBoundsController({ allPoints }: MapBoundsControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (allPoints.length === 0) return;
    map.fitBounds(L.latLngBounds(allPoints), { padding: [48, 48] });
  }, [map, allPoints]);

  return null;
}
