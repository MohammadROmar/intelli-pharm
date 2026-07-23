import { getBearing } from '@/shared/map';

import type { LocationEvent } from '../model/types';

const HEADING_BUCKET_SIZE_DEG = 15;

export type ResolvedHeading = { degrees: number };

export function resolveHeading(
  current: LocationEvent,
  previous: LocationEvent | undefined,
): ResolvedHeading | null {
  if (current.s === null || current.s === 0) {
    return null;
  }

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
