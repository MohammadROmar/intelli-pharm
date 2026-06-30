const CHUNK_ERROR_RE =
  /failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|is not a valid javascript mime type|loading chunk|loading css chunk/i;

export function isChunkLoadError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return CHUNK_ERROR_RE.test(error.message);
}

const RELOAD_KEY = 'chunk-reload-attempted-at';
const RELOAD_TTL_MS = 10_000;

let _cachedTimestamp: number | null = null;

function _readTimestamp(): number {
  if (_cachedTimestamp === null) {
    _cachedTimestamp = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0);
  }
  return _cachedTimestamp;
}

export function alreadyTriedReload(): boolean {
  const at = _readTimestamp();
  return Boolean(at) && Date.now() - at < RELOAD_TTL_MS;
}

export function tryAutoReload(): boolean {
  if (alreadyTriedReload()) return false;
  const ts = Date.now();
  sessionStorage.setItem(RELOAD_KEY, String(ts));
  _cachedTimestamp = ts; // keep cache in sync with the write
  window.location.reload();
  return true;
}
