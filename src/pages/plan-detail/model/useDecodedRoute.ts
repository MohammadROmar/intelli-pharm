import type L from 'leaflet';
import type { LatLngTuple } from 'leaflet';
import { useMemo } from 'react';

import { useFormatDistance, useFormatDuration } from '@/entities/plan';
import type { PlanPath, PlanVisit } from '@/entities/plan';
import { decodePolyline } from '@/shared/map';

import { getStopIcon } from '../config/planIcons';
import { isVisited } from '../lib/helpers';

export type PharmacyMarker = {
  position: LatLngTuple;
  visit: PlanVisit;
  icon: L.DivIcon;
  distanceLabel: string;
  durationLabel: string;
};

export type DecodedRoute = {
  paths: PlanPath[];
  decodedPaths: LatLngTuple[][];
  visitByOrder: Map<number, PlanVisit>;
  startPoint: LatLngTuple | undefined;
  allPoints: LatLngTuple[];
  pharmacyMarkers: PharmacyMarker[];
  markersByOrder: Map<number, PharmacyMarker>;
};

// Module-level cache: decoding a polyline is pure w.r.t. its geometry string,
// and the same geometry gets decoded again on every tab switch (Tabs unmount
// inactive content) and independently by both PlanRouteMap and
// PlanRouteStepMap. Caching here means it only happens once per session.
const polylineCache = new Map<string, LatLngTuple[]>();

function getDecodedPolyline(geometry: string): LatLngTuple[] {
  const cached = polylineCache.get(geometry);
  if (cached) return cached;

  const decoded = decodePolyline(geometry) as LatLngTuple[];
  polylineCache.set(geometry, decoded);
  return decoded;
}

export function useDecodedRoute(
  paths: PlanPath[],
  visits: PlanVisit[],
): DecodedRoute {
  const formatDistance = useFormatDistance();
  const formatDuration = useFormatDuration();

  const sortedPaths = useMemo(
    () => [...paths].sort((a, b) => a.from_sequence - b.from_sequence),
    [paths],
  );

  const visitByOrder = useMemo(
    () => new Map(visits.map((v) => [v.visit_order, v])),
    [visits],
  );

  const decodedPaths = useMemo(
    () => sortedPaths.map((p) => getDecodedPolyline(p.geometry)),
    [sortedPaths],
  );

  const allPoints = useMemo(() => decodedPaths.flat(), [decodedPaths]);

  const startPoint = useMemo<LatLngTuple | undefined>(() => {
    const firstPathIdx = sortedPaths.findIndex((p) => p.from_sequence === 0);
    return decodedPaths[firstPathIdx]?.[0];
  }, [sortedPaths, decodedPaths]);

  const pharmacyMarkers = useMemo<PharmacyMarker[]>(() => {
    const seen = new Set<number>();

    return sortedPaths.flatMap((path, i) => {
      if (path.to_sequence === 0) return [];
      if (seen.has(path.to_sequence)) return []; // guard against duplicate stops sharing a to_sequence

      const decoded = decodedPaths[i];
      const position = decoded?.[decoded.length - 1] as LatLngTuple | undefined;
      const visit = visitByOrder.get(path.to_sequence);
      if (!position || !visit) return [];

      seen.add(path.to_sequence);

      return [
        {
          position,
          visit,
          icon: getStopIcon(visit.visit_order, isVisited(visit)),
          distanceLabel: formatDistance(path.distance_m),
          durationLabel: formatDuration(path.duration_sec),
        },
      ];
    });
  }, [sortedPaths, decodedPaths, visitByOrder, formatDistance, formatDuration]);

  const markersByOrder = useMemo(
    () => new Map(pharmacyMarkers.map((m) => [m.visit.visit_order, m])),
    [pharmacyMarkers],
  );

  return {
    paths: sortedPaths,
    decodedPaths,
    visitByOrder,
    startPoint,
    allPoints,
    pharmacyMarkers,
    markersByOrder,
  };
}
