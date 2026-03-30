export function buildUrl(
  basePath: string,
  page: number,
  currentParams: URLSearchParams,
  extraParams?: Record<string, string>,
): string {
  const params = new URLSearchParams(currentParams);
  if (extraParams) {
    Object.entries(extraParams).forEach(([k, v]) => params.set(k, v));
  }
  params.set('page', String(page));
  return `${basePath}?${params.toString()}`;
}
