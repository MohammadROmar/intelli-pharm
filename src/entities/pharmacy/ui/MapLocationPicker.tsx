import { useEffect } from 'react';
import { Marker, useMapEvents, useMap } from 'react-leaflet';

import { createIcon, MapView } from '@/shared/map';

type LatLng = { lat: number; lng: number };

function MapController({
  position,
  centerOn,
  onChange,
}: {
  position: LatLng;
  centerOn: LatLng | null;
  onChange: (next: LatLng) => void;
}) {
  const map = useMap();

  useMapEvents({
    click(e) {
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  useEffect(() => {
    if (centerOn) map.flyTo([centerOn.lat, centerOn.lng], map.getZoom());
  }, [centerOn, map]);

  return (
    <Marker
      position={[position.lat, position.lng]}
      draggable
      icon={createIcon('simple')}
      eventHandlers={{
        dragend(e) {
          const { lat, lng } = (e.target as L.Marker).getLatLng();
          onChange({ lat, lng });
        },
      }}
    />
  );
}

export function MapLocationPicker({
  position,
  onChange,
  centerOn = null,
}: {
  position: LatLng;
  onChange: (next: LatLng) => void;
  centerOn?: LatLng | null;
}) {
  return (
    <MapView center={[position.lat, position.lng]}>
      <MapController
        position={position}
        centerOn={centerOn}
        onChange={onChange}
      />
    </MapView>
  );
}
