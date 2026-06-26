import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import './styles/index.css';

const RELOAD_GUARD_KEY = 'chunk-reload-attempted-at';
const RELOAD_GUARD_TTL_MS = 10_000;

function alreadyTriedReload() {
  const at = Number(sessionStorage.getItem(RELOAD_GUARD_KEY));
  return Boolean(at) && Date.now() - at < RELOAD_GUARD_TTL_MS;
}

window.addEventListener('vite:preloadError', (event) => {
  if (!navigator.onLine) return;
  if (alreadyTriedReload()) return;

  if (import.meta.env.DEV) console.warn('[vite:preloadError]', event.payload);

  event.preventDefault();
  sessionStorage.setItem(RELOAD_GUARD_KEY, String(Date.now()));
  window.location.reload();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
