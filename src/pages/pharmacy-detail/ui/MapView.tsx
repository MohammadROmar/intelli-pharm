import { Marker, Popup } from 'react-leaflet';

import { createIcon, MapView as LeafletMapView } from '@/shared/map';

type Position = { lat: number; lng: number };

type Props = { position: Position; label: string };

export function MapView({ position, label }: Props) {
  return (
    <LeafletMapView center={[position.lat, position.lng]}>
      <Marker position={position} icon={createIcon('pharmacy')}>
        <Popup className="font-cairo">{label}</Popup>
      </Marker>
    </LeafletMapView>
  );
}
