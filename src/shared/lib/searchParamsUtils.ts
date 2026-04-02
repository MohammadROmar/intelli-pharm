const MIN_PER_PAGE = 10;
const MAX_PER_PAGE = 100;

function clampSearchParamInt(
  searchParams: URLSearchParams,
  key: string,
  min: number,
  max: number,
  fallback: number = min,
): number {
  const raw = searchParams.get(key);
  const parsed = Number(raw);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  const value = Math.trunc(parsed);

  if (value < min) return min;
  if (value > max) return max;

  return value;
}

export function getPerPage(searchParams: URLSearchParams): number {
  return clampSearchParamInt(
    searchParams,
    'per_page',
    MIN_PER_PAGE,
    MAX_PER_PAGE,
    MIN_PER_PAGE,
  );
}

export function getPage(searchParams: URLSearchParams): number {
  return clampSearchParamInt(
    searchParams,
    'page',
    1,
    Number.MAX_SAFE_INTEGER,
    1,
  );
}
