import { useMemo } from 'react';
import L from 'leaflet';
import { Marker, Pane } from 'react-leaflet';

import { useLivePosition } from '../model/useLivePosition';
import './tracking-marker.css';

const RING_SIZE = 64;

const RING_PANE_Z_INDEX = 655;

const ringIcon = L.divIcon({
  className: '',
  html: `
    <div style="position:relative;width:${RING_SIZE}px;height:${RING_SIZE}px;display:flex;align-items:center;justify-content:center;pointer-events:none;">
      <div class="tracking-focus-ring" style="position:absolute;width:40px;height:40px;border-radius:50%;background:var(--ring, #2563eb);"></div>
    </div>
  `,
  iconSize: [RING_SIZE, RING_SIZE],
  iconAnchor: [RING_SIZE / 2, RING_SIZE / 2],
});

type Props = { userId: number };

export function TrackingFocusRing({ userId }: Props) {
  const position = useLivePosition(userId);

  const latLng = useMemo<[number, number] | null>(
    () => (position ? [position.lat, position.lon] : null),
    [position],
  );

  if (!latLng) return null;

  return (
    <Pane name="employeeFocusRing" style={{ zIndex: RING_PANE_Z_INDEX }}>
      <Marker
        position={latLng}
        icon={ringIcon}
        interactive={false}
        keyboard={false}
      />
    </Pane>
  );
}
