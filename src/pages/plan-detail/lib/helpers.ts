import type { PlanVisit } from '@/entities/plan';

import { ROUTE_COLORS } from '../config/colors';

export function isVisited(visit: Pick<PlanVisit, 'visited'>): boolean {
  return visit.visited === 1;
}

export function getPathColor(visit: PlanVisit | undefined): string {
  if (!visit) return ROUTE_COLORS.neutral;
  return isVisited(visit) ? ROUTE_COLORS.visited : ROUTE_COLORS.pending;
}
