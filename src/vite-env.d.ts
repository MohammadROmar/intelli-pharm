interface VitePreloadErrorEvent extends Event {
  payload: Error;
}

declare global {
  interface WindowEventMap {
    'vite:preloadError': VitePreloadErrorEvent;
  }
}
