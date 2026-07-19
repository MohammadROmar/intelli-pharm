import { getBearing } from '@/shared/map';

import type { LocationEvent } from '../model/types';

const IDLE_SPEED_THRESHOLD_MPS = 0.3;

const HEADING_BUCKET_SIZE_DEG = 15;

export type ResolvedHeading = { degrees: number };

export function resolveHeading(
  current: LocationEvent,
  previous: LocationEvent | undefined,
): ResolvedHeading | null {
  const isStationary =
    current.s != null && current.s < IDLE_SPEED_THRESHOLD_MPS;
  if (isStationary) return null;

  if (current.h != null) {
    return { degrees: current.h };
  }

  if (!previous) return null;

  const samePoint =
    previous.lat === current.lat && previous.lon === current.lon;
  if (samePoint) return null;

  const degrees = getBearing(
    { lat: previous.lat, lng: previous.lon },
    { lat: current.lat, lng: current.lon },
  );

  return { degrees };
}

export function bucketHeading(degrees: number): number {
  return (
    (Math.round(degrees / HEADING_BUCKET_SIZE_DEG) * HEADING_BUCKET_SIZE_DEG) %
    360
  );
}
