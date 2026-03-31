import { memo, useEffect, useRef } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  ColorScheme,
  Map,
  useMap,
} from '@vis.gl/react-google-maps';

import type { LatLng } from '@/shared/lib';

type MapInnerProps = {
  position: LatLng;
  centerOn: LatLng | null;
  onChange: (next: LatLng) => void;
};

const MapInner = memo(function MapInner({
  position,
  centerOn,
  onChange,
}: MapInnerProps) {
  const map = useMap();
  const prevCenterRef = useRef<LatLng | null>(null);

  useEffect(() => {
    if (
      !map ||
      !centerOn ||
      (centerOn.lat === prevCenterRef.current?.lat &&
        centerOn.lng === prevCenterRef.current?.lng)
    )
      return;

    map.panTo(centerOn);
    prevCenterRef.current = centerOn;
  }, [map, centerOn]);

  return (
    <Map
      className="h-64 w-full rounded-lg"
      defaultCenter={position}
      defaultZoom={13}
      gestureHandling="cooperative"
      disableDefaultUI
      mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
      colorScheme={ColorScheme.DARK}
      onClick={(e) => {
        if (e.detail.latLng) {
          onChange({ lat: e.detail.latLng.lat, lng: e.detail.latLng.lng });
        }
      }}
    >
      <AdvancedMarker
        position={position}
        draggable
        onDragEnd={(e) => {
          if (e.latLng) {
            onChange({ lat: e.latLng.lat(), lng: e.latLng.lng() });
          }
        }}
      />
    </Map>
  );
});

type MapLocationPickerProps = {
  position: LatLng;
  onChange: (next: LatLng) => void;
  centerOn?: LatLng | null;
};

export function MapLocationPicker({
  position,
  onChange,
  centerOn = null,
}: MapLocationPickerProps) {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <MapInner position={position} onChange={onChange} centerOn={centerOn} />
    </APIProvider>
  );
}
