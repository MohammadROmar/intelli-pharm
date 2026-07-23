import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

import { useLivePosition } from '@/entities/tracking';

const FOCUS_ZOOM = 15;
const FLY_DURATION_SECONDS = 1;

type Props = {
  userId: number;
  isFollowing: boolean;
  sessionKey: string;
  onDragDetected: () => void;
};

export function FollowMapController({
  userId,
  isFollowing,
  sessionKey,
  onDragDetected,
}: Props) {
  const map = useMap();
  const position = useLivePosition(userId);
  const centeredForSessionRef = useRef<string | null>(null);

  const lat = position?.lat;
  const lon = position?.lon;

  useEffect(() => {
    if (lat === undefined || lon === undefined) return;

    const isNewSession = centeredForSessionRef.current !== sessionKey;
    if (!isNewSession && !isFollowing) return;

    const target: [number, number] = [lat, lon];

    if (isNewSession) {
      centeredForSessionRef.current = sessionKey;
      const targetZoom = Math.max(map.getZoom(), FOCUS_ZOOM);
      map.flyTo(target, targetZoom, { duration: FLY_DURATION_SECONDS });
      return;
    }

    map.panTo(target, { animate: true, duration: FLY_DURATION_SECONDS });
  }, [lat, lon, sessionKey, isFollowing, map]);

  useEffect(() => {
    const handleDragStart = () => onDragDetected();
    map.on('dragstart', handleDragStart);
    return () => {
      map.off('dragstart', handleDragStart);
    };
  }, [map, onDragDetected]);

  return null;
}
