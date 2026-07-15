export function buildUrl(
  basePath: string,
  page: number,
  currentParams: URLSearchParams,
  extraParams?: Record<string, string | number | boolean | undefined | null>,
): string {
  const params = new URLSearchParams(currentParams);

  if (extraParams) {
    Object.entries(extraParams).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') {
        params.delete(k);
      } else {
        params.set(k, String(v));
      }
    });
  }

  params.set('page', String(page));

  const separator = basePath.includes('?') ? '&' : '?';

  return `${basePath}${separator}${params.toString()}`;
}
