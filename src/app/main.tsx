import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { isChunkLoadError, tryAutoReload } from '@/shared/lib';

import './styles/index.css';

window.addEventListener('vite:preloadError', (event) => {
  if (!navigator.onLine) return;
  if (!isChunkLoadError(event.payload as Error)) return;

  event.preventDefault();

  if (import.meta.env.DEV) console.warn('[vite:preloadError]', event.payload);

  tryAutoReload();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
