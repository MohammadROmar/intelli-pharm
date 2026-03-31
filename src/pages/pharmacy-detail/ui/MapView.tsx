import {
  APIProvider,
  AdvancedMarker,
  ColorScheme,
  Map,
} from '@vis.gl/react-google-maps';

type Position = { lat: number; lng: number };

type Props = { position: Position; label: string };

export function MapView({ position, label }: Props) {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        reuseMaps
        className="h-64 w-full rounded-lg"
        defaultCenter={position}
        defaultZoom={14}
        gestureHandling="cooperative"
        disableDefaultUI
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
        colorScheme={ColorScheme.DARK}
      >
        <AdvancedMarker position={position} title={label} />
      </Map>
    </APIProvider>
  );
}
