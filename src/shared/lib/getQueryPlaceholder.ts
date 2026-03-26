export function getQueryPlaceholder<T>(prev: T[] | undefined) {
  if (prev && prev.length > 0) {
    return prev;
  }

  return undefined;
}
