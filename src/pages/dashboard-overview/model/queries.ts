import { useSuspenseGetResource } from '@/shared/model';

import { ORDERS_TREND_DAYS, TARGET_LEADERBOARD_LIMIT } from './constants';
import type {
  DashboardPeriod,
  DashboardRange,
  DashboardSummary,
  OrdersTrend,
  TargetLeaderboard,
} from './types';

export function useDashboardSummary(
  range: DashboardRange,
  areaId: number | null,
) {
  return useSuspenseGetResource<DashboardSummary>({
    module: 'dashboard',
    queryKey: 'summary',
    withDualLanguage: true,
    params: { range, area_id: areaId ?? undefined },
    staleTime: 60_000,
  });
}

export function useOrdersTrend(days: number = ORDERS_TREND_DAYS) {
  return useSuspenseGetResource<OrdersTrend>({
    module: 'dashboard',
    queryKey: 'orders-trend',
    params: { days },
    staleTime: 60_000,
  });
}

export function useTargetLeaderboard(
  period: DashboardPeriod = 'month',
  limit: number = TARGET_LEADERBOARD_LIMIT,
) {
  return useSuspenseGetResource<TargetLeaderboard>({
    module: 'dashboard',
    queryKey: 'target-leaderboard',
    params: { period, limit },
    staleTime: 60_000,
  });
}
