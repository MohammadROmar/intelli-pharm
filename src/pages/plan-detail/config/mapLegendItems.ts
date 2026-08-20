import { ROUTE_COLORS } from '@/entities/plan';

export const MAP_LEGEND_ITEMS = [
  {
    labelKey: 'map.legend.start',
    color: ROUTE_COLORS.start,
  },
  {
    labelKey: 'map.legend.visited',
    color: ROUTE_COLORS.visited,
  },
  {
    labelKey: 'map.legend.notVisited',
    color: ROUTE_COLORS.pending,
  },
] as const;
