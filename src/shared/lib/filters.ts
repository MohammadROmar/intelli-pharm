export type FilterPrimitive =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined;

export type FilterValue = FilterPrimitive | readonly FilterPrimitive[];

export type FilterSpec = Record<
  string,
  'string' | 'number' | 'boolean' | 'date' | 'csv'
>;

export type FilterParams = Record<string, FilterValue>;

function normalizeScalarValue(
  value: FilterPrimitive,
  type: FilterSpec[string] | undefined,
): string | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (type === 'date') {
    const parsedDate = new Date(value as string | number);
    return Number.isNaN(parsedDate.getTime())
      ? undefined
      : parsedDate.toISOString();
  }

  if (type === 'boolean') {
    return value === true || value === '1' || value === 1 ? '1' : '0';
  }

  if (type === 'number') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? String(parsed) : undefined;
  }

  return String(value);
}

function normalizeArrayValue(
  value: readonly FilterPrimitive[],
  type: FilterSpec[string] | undefined,
): string | undefined {
  const normalized = value
    .map((item) => normalizeScalarValue(item, type))
    .filter((item): item is string => item !== undefined && item !== '');

  if (normalized.length === 0) {
    return undefined;
  }

  return normalized.join(',');
}

function isFilterArray(
  value: FilterValue,
): value is readonly FilterPrimitive[] {
  return Array.isArray(value);
}

function toSortedEntries(
  filters: Record<string, string | undefined>,
): Array<[string, string]> {
  return Object.entries(filters)
    .filter((entry): entry is [string, string] => {
      const [, value] = entry;
      return value !== undefined && value !== '';
    })
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey));
}

export function serializeFilters(
  filters: FilterParams = {},
  spec: FilterSpec = {},
): Record<string, string> {
  const serialized: Record<string, string> = {};

  for (const [key, value] of Object.entries(filters)) {
    const type = spec[key];

    const normalized = isFilterArray(value)
      ? normalizeArrayValue(value, type)
      : normalizeScalarValue(value, type);

    if (normalized !== undefined && normalized !== '') {
      serialized[key] = normalized;
    }
  }

  return Object.fromEntries(toSortedEntries(serialized));
}

export function normalizeApiParams(
  filters?: FilterParams,
  pageNumber?: number,
  perPage?: number,
  spec: FilterSpec = {},
): Record<string, string | number> {
  const params: Record<string, string | number> = {
    ...serializeFilters(filters, spec),
  };

  if (pageNumber !== undefined) {
    params.page_number = pageNumber;
  }

  if (perPage !== undefined) {
    params.per_page = perPage;
  }

  return params;
}

export function parseFilters<T extends FilterParams = FilterParams>(
  searchParams: URLSearchParams,
  spec: FilterSpec = {},
): T {
  const filters: Record<string, FilterValue> = {};

  for (const key of new Set(searchParams.keys())) {
    const type = spec[key];

    if (type === 'csv') {
      const values = searchParams
        .getAll(key)
        .flatMap((value) => value.split(','))
        .map((value) => value.trim())
        .filter(Boolean);

      if (values.length > 0) {
        filters[key] = values;
      }

      continue;
    }

    const rawValue = searchParams.get(key);

    if (rawValue === null || rawValue === '') {
      continue;
    }

    if (type === 'boolean') {
      if (rawValue === '1' || rawValue === 'true') {
        filters[key] = true;
      } else if (rawValue === '0' || rawValue === 'false') {
        filters[key] = false;
      }

      continue;
    }

    if (type === 'number') {
      const parsed = Number(rawValue);

      if (Number.isFinite(parsed)) {
        filters[key] = parsed;
      }

      continue;
    }

    if (type === 'date') {
      const parsedDate = new Date(rawValue);

      if (!Number.isNaN(parsedDate.getTime())) {
        filters[key] = parsedDate;
      }

      continue;
    }

    filters[key] = rawValue;
  }

  return filters as T;
}
