import { type ReactNode } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const TILE_URL =
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?language=en';
const ATTRIBUTION = '© <a href="https://openstreetmap.org">OpenStreetMap</a>';

type Props = {
  center: [number, number];
  zoom?: number;
  className?: string;
  children?: ReactNode;
};

export function MapView({ center, zoom = 13, className, children }: Props) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={5}
      className={className ?? 'z-0 h-64 w-full rounded-lg'}
    >
      <TileLayer attribution={ATTRIBUTION} url={TILE_URL} />
      {children}
    </MapContainer>
  );
}
