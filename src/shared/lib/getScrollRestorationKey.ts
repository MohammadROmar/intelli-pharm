import type { Location, UIMatch } from 'react-router-dom';

export type ScrollRestorationHandle = {
  scrollRestoration?: {
    ignoreSearchParams: readonly string[];
  };
};

export function getScrollRestorationKey(
  location: Location,
  matches: UIMatch[],
): string {
  const ignoredParams = new Set<string>();
  for (const match of matches) {
    const handle = match.handle as ScrollRestorationHandle | undefined;
    const params = handle?.scrollRestoration?.ignoreSearchParams ?? [];
    params.forEach((param) => ignoredParams.add(param));
  }

  if (ignoredParams.size === 0) return location.key;

  if (!location.search) return location.pathname;

  const params = new URLSearchParams(location.search);
  ignoredParams.forEach((param) => params.delete(param));
  params.sort();

  const search = params.toString();
  return search ? `${location.pathname}?${search}` : location.pathname;
}
