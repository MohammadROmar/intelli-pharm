const CHUNK_LOAD_ERROR_RE =
  /failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|failed to load module script|unable to preload css|loading css chunk|loading chunk|chunkloaderror|is not a valid javascript mime type/i;

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return '';
}

export function isChunkLoadError(error: unknown): boolean {
  return CHUNK_LOAD_ERROR_RE.test(getErrorMessage(error));
}
