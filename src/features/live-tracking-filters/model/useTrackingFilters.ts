import { startTransition, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import type { RoleFilter, TrackingFilter } from '@/entities/tracking';

const REGION_PARAM = 'region';
const ROLE_PARAM = 'role';

type UseTrackingFiltersResult = {
  filter: TrackingFilter;
  setRegion: (regionId: number | 'all') => void;
  setRole: (role: RoleFilter) => void;
};

export function useTrackingFilters(): UseTrackingFiltersResult {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = useMemo<TrackingFilter>(() => {
    const regionParam = searchParams.get(REGION_PARAM);
    const roleParam = searchParams.get(ROLE_PARAM);
    const isValidRegionId =
      regionParam !== null && /^\d+$/.test(regionParam.trim());

    return {
      regionId: isValidRegionId ? Number(regionParam) : 'all',
      role:
        roleParam === 'rep' || roleParam === 'distributor' ? roleParam : 'all',
    };
  }, [searchParams]);

  const setRegion = useCallback(
    (regionId: number | 'all') => {
      startTransition(() => {
        setSearchParams(
          (previous) => {
            const next = new URLSearchParams(previous);
            if (regionId === 'all') next.delete(REGION_PARAM);
            else next.set(REGION_PARAM, String(regionId));
            return next;
          },
          { replace: true },
        );
      });
    },
    [setSearchParams],
  );

  const setRole = useCallback(
    (role: RoleFilter) => {
      startTransition(() => {
        setSearchParams((previous) => {
          const next = new URLSearchParams(previous);
          if (role === 'all') next.delete(ROLE_PARAM);
          else next.set(ROLE_PARAM, role);
          return next;
        });
      });
    },
    [setSearchParams],
  );

  return { filter, setRegion, setRole };
}
