import type { StalenessLevel } from '../model/types';

export const STALE_CUTOFF_SECONDS = 120;

const AGING_THRESHOLD_SECONDS = 60;
const CRITICAL_THRESHOLD_SECONDS = 100;

export function getStalenessLevel(
  ts: number,
  nowSeconds: number = Date.now() / 1000,
): StalenessLevel {
  const ageSeconds = nowSeconds - ts;
  if (ageSeconds >= CRITICAL_THRESHOLD_SECONDS) return 'critical';
  if (ageSeconds >= AGING_THRESHOLD_SECONDS) return 'aging';
  return 'live';
}

export function getStalenessOpacity(level: StalenessLevel): number {
  switch (level) {
    case 'critical':
      return 0.45;
    case 'aging':
      return 0.75;
    case 'live':
      return 1;
  }
}
