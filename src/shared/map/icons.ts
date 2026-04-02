import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

type Icon = 'simple' | 'pharmacy' | 'truck' | 'default';

const iconVariants: Record<Icon, L.IconOptions> = {
  simple: {
    iconUrl: '/markers/simple.png',
    iconSize: [32, 45],
    iconAnchor: [11, 44],
    popupAnchor: [6, -40],
  },
  default: {
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  },
  pharmacy: {
    iconUrl: '/markers/pharmacy.png',
    iconSize: [61, 45],
    iconAnchor: [30, 30],
    popupAnchor: [3, -30],
  },
  truck: {
    iconUrl: '/markers/truck.png',
    iconSize: [18, 45],
    iconAnchor: [0, 0],
    popupAnchor: [11, 3],
  },
};

export function createIcon(icon: Icon) {
  return new L.Icon(iconVariants[icon]);
}
