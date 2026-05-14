type QueryKeyValue =
  | Record<string, unknown>
  | string
  | number
  | boolean
  | null
  | undefined;

type DomainQueryKeys = {
  all: readonly [string];
  list: (params: QueryKeyValue) => readonly [string, 'list', QueryKeyValue];
  infinite: (
    params: QueryKeyValue,
  ) => readonly [string, 'infinite', QueryKeyValue];
  detail: (params: QueryKeyValue) => readonly [string, 'detail', QueryKeyValue];
};

export function createDomainQueryKeys(domain: string): DomainQueryKeys {
  return {
    all: [domain],
    list: (params) => [domain, 'list', params],
    infinite: (params) => [domain, 'infinite', params],
    detail: (params) => [domain, 'detail', params],
  };
}
