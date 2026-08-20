import L from 'leaflet';

import { ROUTE_COLORS } from '@/entities/plan';

const ICON_BASE_STYLE =
  'border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;';

const stopIconCache = new Map<string, L.DivIcon>();

export const START_ICON = L.divIcon({
  className: '',
  html: `<div style="width:36px;height:36px;${ICON_BASE_STYLE}background:${ROUTE_COLORS.start};color:white;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -24],
});

export function getStopIcon(order: number, visited: boolean): L.DivIcon {
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
