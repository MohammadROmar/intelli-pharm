type MetricsPageWrapper<T> = {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
};

export type UnwrappedMetricsPage<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};

export function unwrapMetricsPaginated<T>(
  wrapper: MetricsPageWrapper<T>,
): UnwrappedMetricsPage<T> {
  return {
    items: wrapper.data,
    page: wrapper.current_page,
    pageSize: wrapper.per_page,
    totalPages: wrapper.last_page ?? 1,
    totalCount: wrapper.total,
  };
}
